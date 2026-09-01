"use client";

import { geoGraticule, geoNaturalEarth1, geoPath } from "d3-geo";
import { pointer, select } from "d3-selection";
/* Side-effect import: this is what puts `.transition()` on a d3 selection. */
import "d3-transition";
import {
  zoom as d3Zoom,
  zoomIdentity,
  type ZoomBehavior,
  type ZoomTransform,
} from "d3-zoom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import { countries } from "@/components/sections/worldwide/data";
import {
  LABEL_GUTTER,
  LABEL_MIN_WIDTH,
  LABEL_PLACEMENTS,
  LEADER_FROM,
} from "@/components/sections/worldwide/mapLabels";
import {
  loadWorldGeography,
  type WorldGeography,
} from "@/components/sections/worldwide/worldGeography";

import type { CountryId } from "@/components/sections/worldwide/data";

/**
 * The map's three greys, and why there are three.
 *
 * They are doing three different jobs: the land has to separate from the page,
 * the borders have to separate from the land, and the graticule has to sit under
 * both without competing with either. Each is a step darker than the thing
 * behind it and a step lighter than the thing in front, and none is dark enough
 * to argue with a blue marker. Giving them all one value is how a map ends up
 * washed out.
 */
const LAND_FILL = "#e5e9f2";
const LAND_STROKE = "#b4bdc7";
const GRID = "#ccd3db";

/** Breathing room between the drawn world and the edges of its frame. */
const FRAME_INSET = 8;

/** Degrees between graticule lines. */
const GRATICULE_STEP = 30;

/**
 * How much bigger than a plain fit the world is drawn, and where it is centred.
 *
 * Fitting the landmass to the frame fits *all* of it — the tip of Greenland, the
 * tip of Chile and a scattering of Pacific islands at either edge — which leaves
 * the inhabited middle of the world small and a band of nothing above and below
 * it. Scaling past the fit and re-centring on the band the markets actually sit
 * in is what fills the frame, and it lets the extremes run off the edge, which
 * is what an atlas does anyway.
 */
const FOCUS: [number, number] = [20, 10];

/**
 * The band the map is cropped to, and the reason the frame has no empty edges.
 *
 * Fitting the whole landmass fits the poles with it — Greenland to 83°N and a
 * tail of sub-antarctic rock below — which on a wide, shallow frame leaves a
 * band of empty ocean above and below the inhabited world. These two parallels
 * are roughly northern Canada and just under Australia: everything anybody
 * ships to, and nothing else.
 */
const BAND_TOP = 70;
const BAND_BOTTOM = -46;

/** A shade past a perfect fit, so no coastline sits exactly on an edge. */
const OVERSCAN = 1.02;

/**
 * How far in the map will go, and how it gets there.
 *
 * Double-click zooms toward the pointer and dragging pans once there is
 * somewhere to pan to; the wheel is deliberately left alone, because a map that
 * swallowed the wheel would trap a visitor scrolling past it. `translateExtent`
 * is pinned to the frame, so the world cannot be dragged out of view and there
 * is nothing to pan at all until the first zoom.
 */
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
/** One double-click, or one press of the `+` button. */
const ZOOM_STEP = 1.7;
const ZOOM_MS = 400;

const CONTROL_CLASS =
  "grid size-8 place-items-center rounded-lg border border-border bg-white text-[15px] leading-none font-medium text-muted-foreground shadow-[0_2px_8px_-2px_rgba(15,23,42,0.18)] transition-colors hover:text-ink";

const GRATICULE = geoGraticule().step([GRATICULE_STEP, GRATICULE_STEP]);

interface Frame {
  readonly width: number;
  readonly height: number;
}

interface OperatingRegionsMapProps {
  readonly className?: string;
}

/**
 * The coverage map.
 *
 * A world map drawn with `d3-geo` straight into SVG: countries in neutral grey,
 * a graticule under them, and a marker on each of the fourteen markets `data.ts`
 * names, each carrying its own flag and name.
 *
 * Everything is derived from one projection. The country outlines, the
 * graticule, the markers, their leader lines and the HTML labels floating over
 * the drawing are all placed by the same `geoNaturalEarth1` instance, fitted to
 * whatever width the section currently has. That is what keeps a marker on its
 * country at every size — nothing here is positioned in pixels somebody
 * measured, and a resize re-fits the projection rather than nudging anything.
 *
 * Natural Earth rather than Mercator, because this map's job is to show markets
 * spread across five regions, and Mercator answers that by making Greenland the
 * size of Africa.
 *
 * The flag and the name are part of the marker rather than a tooltip. A map
 * whose content only exists on hover says nothing to somebody reading it, and
 * nothing at all to a phone.
 */
export function OperatingRegionsMap({ className }: OperatingRegionsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  /*
    The zoom transform, kept in state rather than written straight to the DOM,
    because it has to move three things that are not in the same coordinate
    system: the geography inside the SVG, the markers drawn over it, and the
    HTML labels floating above both.
  */
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity);
  const behaviourRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(
    null,
  );
  /** Flipped by an observer, so the map rises into view once and never again. */
  const [revealed, setRevealed] = useState(false);
  const [world, setWorld] = useState<WorldGeography | null>(null);
  const [activeId, setActiveId] = useState<CountryId | null>(null);
  /*
    The entrance runs off a transition rather than a keyframe, so it needs a
    frame with the markers at rest before it can be turned on. That keeps the
    whole animation inside this component instead of adding a global keyframe,
    and it leaves `transform` free for the hover scale — an animation on the
    same property would fight it.
  */
  const [entered, setEntered] = useState(false);

  /*
    The frame is measured rather than assumed, because the projection is fitted
    to it. A breakpoint would only say what the section is allowed to be; the
    observer says what it actually became.
  */
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setFrame((current) =>
        current && current.width === width && current.height === height
          ? current
          : { width, height },
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    void loadWorldGeography().then((geography) => {
      if (!cancelled) setWorld(geography);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!world || !frame) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [world, frame]);

  /*
    `world` is a dependency even though it is not read here.

    The SVG this attaches to is only rendered once the geography has arrived, so
    on a first paint where the frame is measured before the atlas lands, the ref
    is still empty and this bails. Without the geography in the dependency list
    it never runs again, and the map silently loses zoom entirely — which is
    exactly what happened.
  */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !world || !frame || frame.width <= 0) return;

    const extent: [[number, number], [number, number]] = [
      [0, 0],
      [frame.width, frame.height],
    ];

    const behaviour = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([MIN_ZOOM, MAX_ZOOM])
      .extent(extent)
      .translateExtent(extent)
      /*
        Everything except the wheel. d3 gives double-click-to-zoom and
        drag-to-pan out of this for free, both already easing toward the
        pointer; taking the wheel out is what stops the map hijacking a scroll.
      */
      .filter(
        (event: Event) =>
          event.type !== "wheel" && !(event as MouseEvent).ctrlKey,
      )
      .on("zoom", (event: { transform: ZoomTransform }) => {
        setTransform(event.transform);
      });

    const selection = select(svg);
    selection.call(behaviour);
    behaviourRef.current = behaviour;

    /*
      d3's own double-click handler jumps by a factor of two instantly. Replacing
      it is the only way to get a gentler step on a transition long enough to
      follow — and `pointer` is what makes it zoom toward the place that was
      clicked rather than the middle of the map.
    */
    selection.on("dblclick.zoom", null);
    selection.on("dblclick", (event: MouseEvent) => {
      event.preventDefault();
      selection
        .transition()
        .duration(ZOOM_MS)
        .call(behaviour.scaleBy, ZOOM_STEP, pointer(event, svg));
    });

    return () => {
      selection.on(".zoom", null);
      selection.on("dblclick", null);
      behaviourRef.current = null;
    };
  }, [frame, world]);

  /*
    The reveal, once. A map that re-animated every time it scrolled past would
    be a map that never settles.
  */
  useEffect(() => {
    const element = containerRef.current;
    if (!element || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [revealed]);

  const labelled = (frame?.width ?? 0) >= LABEL_MIN_WIDTH;

  const projection = useMemo(() => {
    if (!frame || !world || frame.width <= 0 || frame.height <= 0) return null;

    const right = frame.width - (labelled ? LABEL_GUTTER : FRAME_INSET);
    const bottom = frame.height - FRAME_INSET;
    const usableWidth = right - FRAME_INSET;
    const usableHeight = bottom - FRAME_INSET;

    /*
      A cover fit rather than a contain fit, measured off the band rather than
      off the landmass.

      `fitExtent` contains: it shrinks until the whole thing is inside, which is
      what leaves empty ocean above and below a world that is much wider than
      the frame. Measuring the band at unit scale and taking the *larger* of the
      two ratios fills the frame instead, and lets whichever axis is longer run
      off the edge — which for this band is a sliver of the Pacific, not land.
    */
    const unit = geoNaturalEarth1().scale(1).translate([0, 0]);
    const top = unit([0, BAND_TOP]);
    const floor = unit([0, BAND_BOTTOM]);
    const west = unit([-180, 0]);
    const east = unit([180, 0]);
    if (!top || !floor || !west || !east) return null;

    const scale =
      Math.max(
        usableWidth / (east[0] - west[0]),
        usableHeight / (floor[1] - top[1]),
      ) * OVERSCAN;

    const fitted = geoNaturalEarth1().scale(scale).translate([0, 0]);
    const focus = fitted(FOCUS);
    if (!focus) return null;

    /*
      Translating by the difference rather than calling `center()`: `center`
      re-derives the translation from the projection's own rotation, and the two
      disagree by a few pixels at this scale.
    */
    fitted.translate([
      (FRAME_INSET + right) / 2 - focus[0],
      (FRAME_INSET + bottom) / 2 - focus[1],
    ]);

    return fitted;
  }, [frame, world, labelled]);

  /*
    The drawing is rebuilt only when the projection changes, which is on a resize
    and on the one load. A hover changes `activeId` and nothing else, so it
    re-renders markers against paths that were already computed rather than
    re-projecting the world to move one circle.
  */
  const drawing = useMemo(() => {
    if (!projection || !world) return null;

    const path = geoPath(projection);

    return {
      graticule: path(GRATICULE()) ?? "",
      countries: world.countries.map((country, index) => ({
        key: String(country.id ?? country.properties.name ?? index),
        d: path(country) ?? "",
      })),
      markets: countries.flatMap((country) => {
        const point = projection([country.lng, country.lat]);
        if (!point) return [];

        const placement = LABEL_PLACEMENTS[country.id];
        const [x, y] = point;

        return [
          {
            id: country.id,
            name: country.name,
            flag: `/flags/${country.iso.toLowerCase()}.svg`,
            x,
            y,
            placement,
            labelX: x + placement.dx,
            labelY: y + placement.dy,
            leader: Math.abs(placement.dy) > LEADER_FROM,
          },
        ];
      }),
    };
  }, [projection, world]);

  /*
    Markers and labels are placed from the zoomed coordinate rather than drawn
    inside the zoomed group. Inside it they would scale with the map, and a pin
    four times its size is a blob; out here they keep one size at every zoom and
    still sit exactly on their country.
  */
  const nudgeZoom = useCallback((factor: number) => {
    const svg = svgRef.current;
    const behaviour = behaviourRef.current;
    if (!svg || !behaviour) return;
    select(svg).transition().duration(ZOOM_MS).call(behaviour.scaleBy, factor);
  }, []);

  const resetZoom = useCallback(() => {
    const svg = svgRef.current;
    const behaviour = behaviourRef.current;
    if (!svg || !behaviour) return;
    select(svg)
      .transition()
      .duration(ZOOM_MS)
      .call(behaviour.transform, zoomIdentity);
  }, []);

  const place = (x: number, y: number): [number, number] => [
    x * transform.k + transform.x,
    y * transform.k + transform.y,
  ];

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`A world map marking the countries ${siteConfig.name} operates in: ${countries
        .map((country) => country.name)
        .join(", ")}.`}
      className={cn(
        /*
          Five steps, because one ratio does not fit a column that goes from a
          phone to a desktop. The world here is about 2:1, so the height that
          leaves no band of nothing above and below it is roughly half the width
          until the width runs past what the section will give — which is where
          the last step caps it.
        */
        /*
          The frame is the band's own shape, not a ladder of guessed heights.

          The inhabited world at this projection is 2.72:1. Give the container
          that ratio and the fit has nothing left to do: no empty ocean above or
          below, and nothing cropped off the sides — the two failure modes this
          section has had in turn. The floor is for a phone, where the derived
          height would otherwise be a strip; there the fit crops a few per cent
          of the Pacific, which is the one part of the frame with nothing in it.
        */
        "relative aspect-[2.72/1] max-h-[515px] min-h-[150px] w-full touch-pan-y select-none",
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
      onMouseLeave={() => setActiveId(null)}
    >
      {drawing && frame ? (
        <>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${frame.width} ${frame.height}`}
            className="block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
            aria-hidden
          >
            {/*
              Only the geography is zoomed. `non-scaling-stroke` keeps the
              country hairlines a hairline at every zoom, which is the whole
              reason the borders stay elegant instead of thickening into a
              political map as you go in.
            */}
            <g
              transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}
            >
              {/*
              The graticule first, so every country is painted over it. Thin and
              nearly transparent: it is there to say "this is a map of the world"
              out of the corner of the eye, and a grid you actually notice on a
              coverage map is a grid competing with the coverage.
            */}
              <path
                d={drawing.graticule}
                fill="none"
                stroke={GRID}
                strokeWidth={0.5}
                strokeOpacity={0.7}
                vectorEffect="non-scaling-stroke"
              />

              <g>
                {drawing.countries.map((country) => (
                  <path
                    key={country.key}
                    d={country.d}
                    fill={LAND_FILL}
                    stroke={LAND_STROKE}
                    strokeWidth={0.7}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            </g>

            {/*
              The leaders stand down with the names they point at: a leader whose
              label has dropped out is a line from a marker to nothing.
            */}
            {labelled ? (
              <g>
                {drawing.markets
                  .filter((market) => market.leader)
                  .map((market) => {
                    const [mx, my] = place(market.x, market.y);
                    const step = Math.sign(market.placement.dy);

                    return (
                      <line
                        key={`leader-${market.id}`}
                        x1={mx}
                        y1={my + step * 11}
                        x2={mx + market.placement.dx}
                        y2={my + market.placement.dy - step * 13}
                        stroke="var(--ink)"
                        strokeWidth={1}
                        strokeOpacity={0.22}
                      />
                    );
                  })}
              </g>
            ) : null}

            <g>
              {drawing.markets.map((market, index) => {
                const active = activeId === market.id;
                const [mx, my] = place(market.x, market.y);

                return (
                  <g
                    key={market.id}
                    className="motion-reduce:transition-none"
                    style={{
                      transformOrigin: `${mx}px ${my}px`,
                      transform: active ? "scale(1.14)" : "scale(1)",
                      opacity: entered ? 1 : 0,
                      transitionProperty: "opacity, transform",
                      transitionDuration: "420ms, 200ms",
                      transitionTimingFunction:
                        "ease-out, cubic-bezier(0.33, 1, 0.68, 1)",
                      /*
                        The stagger is the entrance: fourteen markers landing a
                        beat apart read as being placed, where fourteen appearing
                        together read as being switched on. Only the opacity is
                        delayed — a hover must answer immediately.
                      */
                      transitionDelay: `${200 + index * 55}ms, 0ms`,
                    }}
                  >
                    {/*
                      Three circles, back to front: the glow, the white body and
                      the blue core. The glow separates a market from the grey
                      country under it; the white body is the gap that stops two
                      neighbouring markets reading as one blob.
                    */}
                    {/*
                      The pulse, as SMIL rather than a keyframe, so the whole
                      animation lives with the element that uses it. It is
                      staggered per marker — fourteen rings breathing in unison
                      would read as a heartbeat rather than as a scatter of
                      markets — and it hides itself outright under
                      `prefers-reduced-motion`.
                    */}
                    <g className="motion-reduce:hidden">
                      <circle
                        cx={mx}
                        cy={my}
                        r={13}
                        fill="var(--brand)"
                        fillOpacity={0}
                      >
                        <animate
                          attributeName="r"
                          values="11;22"
                          dur="3.4s"
                          begin={`${index * 0.24}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="fill-opacity"
                          values="0.18;0"
                          dur="3.4s"
                          begin={`${index * 0.24}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                    <circle
                      cx={mx}
                      cy={my}
                      r={13}
                      fill="var(--brand)"
                      fillOpacity={active ? 0.3 : 0.13}
                      className="transition-[fill-opacity] duration-200 ease-out motion-reduce:transition-none"
                    />
                    <circle
                      cx={mx}
                      cy={my}
                      r={7.5}
                      fill="#ffffff"
                      stroke="var(--brand)"
                      strokeWidth={1.5}
                      strokeOpacity={0.4}
                      style={{
                        filter: "drop-shadow(0 1px 3px rgba(11, 27, 54, 0.18))",
                      }}
                    />
                    <circle cx={mx} cy={my} r={4} fill="var(--brand)" />
                    {/*
                      The hit area is its own transparent circle, and it is much
                      larger than the marker. Fourteen markets on a world map
                      means markers a few pixels across, and a target a few pixels
                      across is not a target.
                    */}
                    <circle
                      cx={mx}
                      cy={my}
                      r={17}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveId(market.id)}
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {/*
            The labels are HTML over the drawing rather than `<text>` inside it.
            They carry a real image and real type, so the flag stays crisp and
            the name is set in the page's own font rather than re-implemented.
          */}
          {labelled ? (
            <div className="pointer-events-none absolute inset-0">
              {drawing.markets.map((market, index) => {
                const active = activeId === market.id;
                const [mx, my] = place(market.x, market.y);

                return (
                  <span
                    key={market.id}
                    className={cn(
                      "absolute flex items-center gap-[6px] rounded-[5px] py-[3px] pr-[7px] pl-[5px] text-[13px] leading-none font-semibold whitespace-nowrap text-ink transition-[background-color,box-shadow,scale] duration-200",
                      /*
                        A backing tight to its contents, not a card. The label
                        sits over grey countries and hairline borders, and a few
                        pixels of white either side is enough to lift it off;
                        anything more and the map turns into a set of chips.
                      */
                      active
                        ? "scale-[1.06] bg-white shadow-[0_6px_18px_-8px_rgba(15,23,42,0.35)]"
                        : "bg-white/[0.88]",
                    )}
                    style={{
                      left: mx + market.placement.dx,
                      top: my + market.placement.dy,
                      translate:
                        market.placement.side === "left"
                          ? "-100% -50%"
                          : market.placement.side === "center"
                            ? "-50% -50%"
                            : "0 -50%",
                      opacity: entered ? 1 : 0,
                      transition: `opacity 420ms ease-out ${300 + index * 55}ms`,
                    }}
                  >
                    {/*
                      A 15px local SVG flag, drawn fourteen times over a map.
                      `next/image` would wrap each one in lazy-loading machinery
                      and an optimiser that does not touch SVG, for no benefit.
                    */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={market.flag}
                      alt=""
                      width={18}
                      height={13}
                      className="block h-[13px] w-[18px] rounded-[2px] transition-transform duration-200 motion-reduce:transition-none"
                      style={{ transform: active ? "scale(1.12)" : "scale(1)" }}
                    />
                    {market.placement.short ?? market.name}
                  </span>
                );
              })}
            </div>
          ) : null}

          {/*
            The tooltip, and the only place the UAE's full name appears.
            Secondary by design: the marker already carries the flag and the
            name, so nothing here is needed in order to read the map.
          */}
          {drawing.markets
            .filter((market) => market.id === activeId)
            .map((market) => (
              <span
                key={market.id}
                className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-full items-center gap-[9px] rounded-[10px] border border-border bg-white px-[11px] py-2 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.28)]"
                style={{
                  left: place(market.x, market.y)[0],
                  top: place(market.x, market.y)[1] - 20,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={market.flag}
                  alt=""
                  width={26}
                  height={19}
                  className="block h-[19px] w-[26px] rounded-[3px] ring-1 ring-black/10"
                />
                <span className="leading-tight">
                  <span className="block text-[13px] font-semibold text-ink">
                    {market.name}
                  </span>
                  <span className="block text-[11px] font-medium text-muted-foreground">
                    Supported market
                  </span>
                </span>
              </span>
            ))}
          {/*
            The controls, and there are only three.

            Double-click and drag are not discoverable on a map that looks
            static, so the same two moves are given buttons — and a reset,
            because a map you can zoom into without a way back out is a trap.
            They are hidden from assistive technology: the map is `role="img"`
            with every market named in its label, so there is nothing behind a
            zoom that a screen reader cannot already read.
          */}
          <div
            aria-hidden
            className="absolute right-3 bottom-3 z-20 flex flex-col gap-1.5 sm:right-4 sm:bottom-4"
          >
            <button
              type="button"
              tabIndex={-1}
              onClick={() => nudgeZoom(ZOOM_STEP)}
              className={CONTROL_CLASS}
            >
              +
            </button>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => nudgeZoom(1 / ZOOM_STEP)}
              className={CONTROL_CLASS}
            >
              −
            </button>
            <button
              type="button"
              tabIndex={-1}
              onClick={resetZoom}
              className={CONTROL_CLASS}
            >
              ⌖
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
