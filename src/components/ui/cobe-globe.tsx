"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import type { COBEOptions } from "cobe";
import type { ReactNode } from "react";

/**
 * One place on the globe.
 *
 * `label` is a node rather than a string so a caller can hand this component
 * whatever it already uses to name a place — a flag beside a word, in the
 * project's case. This file stays in `ui/` and knows nothing about countries;
 * it knows about points on a sphere and the markup that belongs beside them.
 *
 * A marker without a label is still drawn. Not every point worth marking is
 * worth naming, and on a sphere this size only a handful of names fit anyway.
 */
export interface GlobeMarker {
  readonly id: string;
  readonly label?: ReactNode;
  readonly lat: number;
  readonly lng: number;
}

/** A connection drawn between two markers, by id. */
export interface GlobeArc {
  readonly from: string;
  readonly to: string;
}

interface GlobeProps {
  readonly markers: readonly GlobeMarker[];
  readonly arcs?: readonly GlobeArc[];
  /** Highlighted marker — drawn larger, and its label always wins its space. */
  readonly activeId?: string | null;
  readonly className?: string;
  /** Accessible description; the canvas is otherwise a decorative surface. */
  readonly label: string;
}

/** `#2563eb`, the brand blue, in the 0–1 triples cobe wants. */
const BRAND: [number, number, number] = [0.145, 0.388, 0.922];
/** `#6d4aff`, the brand violet, for the marker the list is pointing at. */
const BRAND_VIOLET: [number, number, number] = [0.427, 0.29, 1];

/**
 * How much of the canvas half-width the sphere actually fills.
 *
 * cobe's fragment shader cuts the sphere at `a - 0.64`, so the globe's radius
 * is `sqrt(0.64)` of the canvas half-width. It is not a guess and not a value
 * tuned by eye: it is the same number the shader uses, which is why a label
 * sits on its dot rather than near it.
 */
const GLOBE_RADIUS_RATIO = 0.8;

/** How far above its marker a card floats, and how long the leader is. */
const LEADER_LENGTH = 30;

const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * A place on the unit sphere, in cobe's own coordinates.
 *
 * Taken from cobe's `[lat, lng]` conversion rather than from a general sphere
 * formula, because "a general sphere formula" is how labels end up ninety
 * degrees from their markers. cobe computes
 * `[-cos(lat)·cos(lng-π), sin(lat), cos(lat)·sin(lng-π)]`, and the two `lng-π`
 * terms simplify to the signs below.
 */
function toVector({ lat, lng }: Pick<GlobeMarker, "lat" | "lng">) {
  const latRad = rad(lat);
  const lngRad = rad(lng);
  const cosLat = Math.cos(latRad);

  return {
    x: cosLat * Math.cos(lngRad),
    y: Math.sin(latRad),
    z: -cosLat * Math.sin(lngRad),
  };
}

/**
 * Where a point lands on screen at the current rotation.
 *
 * This is cobe's own marker transform, `o * h`, read off the vertex shader's
 * column-major `mat3` — a spin of `phi` about the vertical axis and a tilt of
 * `theta`. `depth` is the shader's `q.z`, and the shader discards anything
 * with a negative one, so it is also exactly the test for "is this place on
 * the near side of the world".
 */
function projectToScreen(
  marker: Pick<GlobeMarker, "lat" | "lng">,
  phi: number,
  theta: number,
) {
  const { x, y, z } = toVector(marker);
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  return {
    x: cosPhi * x + sinPhi * z,
    y: sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z,
    depth: -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z,
  };
}

/**
 * How many cards may float at once at a given size.
 *
 * Read from the canvas rather than from a breakpoint, because what decides
 * this is how much room the sphere has, and that is the container's width —
 * the same globe is drawn narrow in a phone's single column and wide in a
 * desktop's left half. Four is the most a 480px sphere carries before the
 * cards start reading as a list that happens to be curved.
 */
function labelBudget(width: number) {
  if (width < 340) return 2;
  if (width < 480) return 3;
  return 4;
}

/**
 * A globe that reads as coverage rather than as an ornament.
 *
 * `cobe` draws the sphere, the land, the markers and the arcs on one WebGL
 * canvas; everything above it here is the part cobe has no API for.
 *
 * The named cards are the reason this component exists. cobe can place a dot
 * at a latitude and longitude and nothing else — there is no text in its
 * pipeline — so a labelled globe has to project each place back out to a
 * screen position on every frame and move real DOM over the canvas. That
 * projection is read off cobe's own shader rather than reimplemented from
 * first principles, which is what keeps a name on its dot at every angle
 * instead of somewhere near it.
 *
 * Each card is anchored *at* its marker and draws itself upward from there:
 * the leader line and the card are children of a wrapper sitting exactly on
 * the dot, so the line cannot drift off the point it is pointing at. Nothing
 * is positioned by eye, and there is no second set of coordinates to keep in
 * step with the first.
 *
 * Positions are written straight to `style` from inside the render loop and
 * never through state. A `setState` per frame per label would re-render this
 * subtree sixty times a second and hand the main thread to React for as long
 * as the section is on screen; these are visual output, not application state,
 * and nothing else needs to know about them.
 *
 * Only a few names show at once, and which few is decided every frame: front
 * to back, nearest first, until the budget for the current width runs out.
 * Anything that would overlap a card already placed stands down, and anything
 * on the far side of the world is dropped on the same depth test the shader
 * uses to discard the dot. The result is that the cluster around the Gulf
 * resolves to whichever market is facing the viewer rather than to four cards
 * in a heap, and that a narrow phone shows two names where a desktop shows
 * four.
 *
 * The highlighted marker is exempt from all of it. When the list beside the
 * globe is pointing at a country, that country is named even if it is at the
 * limb and even if the budget is spent — the interaction has to answer, or it
 * is not an interaction.
 *
 * Under `prefers-reduced-motion` the world does not spin. It is parked a few
 * degrees east so the markets the list is about face the viewer, which is the
 * frame the section would want to stop on anyway.
 */
export function Globe({
  markers,
  arcs = [],
  activeId = null,
  className,
  label,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelLayerRef = useRef<HTMLDivElement>(null);
  /*
    The highlighted marker is read through a ref inside the render loop rather
    than closed over, so a hover re-points the loop instead of tearing down the
    WebGL context and building a new one.

    Synced in an effect rather than assigned during render: a ref written while
    rendering is a value React is free to throw away, and the rule that forbids
    it is right here — the loop would read a highlight from a render that never
    committed. The cost is that the globe learns about a hover one frame late,
    which at sixty frames a second is not a thing a person can see.
  */
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const layer = labelLayerRef.current;
    if (!canvas || !layer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const byId = new Map(markers.map((marker) => [marker.id, marker]));
    const labelNodes = markers.map((marker) =>
      marker.label
        ? layer.querySelector<HTMLElement>(`[data-marker="${marker.id}"]`)
        : null,
    );
    /** Measured lazily; a card's width is its country's name and never changes. */
    const cardHalfWidths: (number | undefined)[] = markers.map(() => undefined);

    /*
      Opens on South Asia rather than on the Atlantic.

      cobe's own default of `phi = 0` faces the Americas, and of the ten
      markets on this list exactly one is there — so the section's first
      impression was a globe with a single name on it and the argument on the
      far side. This angle is solved rather than eyeballed: it is the `phi` at
      which India's depth term peaks, which puts the South Asian and Gulf
      cluster square to the viewer with Europe falling off one limb and
      South-East Asia the other. It is also where the globe parks under reduced
      motion, since that is the one frame that will ever be seen.
    */
    let phi = 3.3;
    const theta = 0.28;
    let width = 0;
    let height = 0;

    const measure = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(canvas);

    const cobeMarkers: NonNullable<COBEOptions["markers"]> = markers.map(
      (marker) => ({
        id: marker.id,
        location: [marker.lat, marker.lng],
        size: 0.045,
      }),
    );

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: height * 2,
      phi,
      theta,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16_000,
      mapBrightness: 1.25,
      baseColor: [1, 1, 1],
      markerColor: BRAND,
      glowColor: [1, 1, 1],
      markers: cobeMarkers,
      arcs: arcs.flatMap((arc) => {
        const from = byId.get(arc.from);
        const to = byId.get(arc.to);
        if (!from || !to) return [];
        return [
          {
            from: [from.lat, from.lng] as [number, number],
            to: [to.lat, to.lng] as [number, number],
          },
        ];
      }),
      arcColor: BRAND,
      arcWidth: 0.4,
      arcHeight: 0.25,
    });

    /**
     * Lays the names over the canvas for the current rotation.
     *
     * Front to back, so when two would collide the nearer one is already
     * placed and the further one stands down, and only as many as the width
     * affords. Written straight to `style`: these are visual output, not
     * application state, and routing them through React would re-render this
     * subtree on every frame the section is on screen.
     */
    const positionLabels = (active: string | null) => {
      const radius = (width / 2) * GLOBE_RADIUS_RATIO;
      const budget = labelBudget(width);
      const placed: { x: number; y: number }[] = [];
      let shown = 0;

      const order = markers
        .map((marker, index) => ({
          marker,
          index,
          projected: projectToScreen(marker, phi, theta),
        }))
        .sort((a, b) => {
          if (a.marker.id === active) return -1;
          if (b.marker.id === active) return 1;
          return b.projected.depth - a.projected.depth;
        });

      for (const { marker, index, projected } of order) {
        const node = labelNodes[index];
        if (!node) continue;

        const x = width / 2 + projected.x * radius;
        const y = height / 2 - projected.y * radius;
        const isActive = marker.id === active;

        /*
          Behind the world, over budget, or close enough to a card already
          placed that the two would collide. The shader discards the dot on the
          first of those; the rest is this layer's business, because a dot stays
          legible in places a card does not. The box tested is the card's own
          size — roughly 96 wide, floating a leader above its dot — rather than
          a guess.

          The highlighted marker is exempt from all three. When the list is
          pointing at a country, that country is named even at the limb and even
          with the budget spent, or the interaction does not answer.
        */
        const hidden =
          !isActive &&
          (projected.depth < 0.2 ||
            shown >= budget ||
            placed.some(
              (p) =>
                Math.abs(p.x - x) < 96 &&
                Math.abs(p.y - y) < LEADER_LENGTH + 22,
            ));

        if (hidden) {
          node.style.opacity = "0";
          node.style.visibility = "hidden";
          continue;
        }

        placed.push({ x, y });
        shown += 1;
        node.style.visibility = "visible";

        /*
          Nudged back inside the frame when a card would hang off the edge.

          The wrapper stays on the marker and only the card slides, so the
          leader still starts at the dot and still ends under the name — the
          connector cannot come adrift, which is the whole reason the card is a
          child of the marker rather than a sibling positioned beside it. The
          alternative was clipping, and a card sliced in half by the panel edge
          looks like a bug rather than like a globe.

          Each card is measured once, the first time it is shown, because its
          width is its country's name and that does not change.
        */
        if (cardHalfWidths[index] === undefined) {
          const card = node.querySelector<HTMLElement>("[data-card]");
          if (card) cardHalfWidths[index] = card.offsetWidth / 2;
        }
        const half = cardHalfWidths[index] ?? 58;
        const clamped = Math.min(Math.max(x, half + 4), width - half - 4);
        node.style.setProperty("--nudge", `${clamped - x}px`);
        /*
          Fades as a card approaches the edge of the world rather than switching
          off at it, so the ring of names turns with the globe instead of
          blinking.
        */
        node.style.opacity = isActive
          ? "1"
          : String(Math.min(1, (projected.depth - 0.2) * 4));
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    /*
      The loop.

      cobe drives nothing itself — version 2 dropped the `onRender` callback
      that used to own an internal animation loop, and `update` both applies
      state and draws. So the frame is ours, which is what lets the sphere and
      the names it carries be written in the same tick: there is no way for a
      label to be positioned for a rotation the canvas has not drawn yet.

      Markers are only re-uploaded when the highlight actually changes. Passing
      them every frame re-buffers the array to the GPU sixty times a second to
      say nothing new.
    */
    let frame = 0;
    let uploadedActive: string | null | undefined;
    let running = false;

    const draw = () => {
      const active = activeIdRef.current;
      const state: Parameters<typeof globe.update>[0] = {
        phi,
        theta,
        width: width * 2,
        height: height * 2,
      };

      if (active !== uploadedActive) {
        uploadedActive = active;
        state.markers = cobeMarkers.map((marker) => ({
          ...marker,
          size: marker.id === active ? 0.075 : 0.045,
          color: marker.id === active ? BRAND_VIOLET : BRAND,
        }));
      }

      globe.update(state);
      positionLabels(active);
    };

    const tick = () => {
      phi += 0.0022;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    /*
      Off screen, the globe stops.

      This sits well down a long landing page, and a WebGL surface repainting
      sixty times a second while the visitor reads the pricing table is a fan
      spinning up for nothing. The first frame is still drawn immediately, so
      the section is never blank when it scrolls into view.
    */
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    visibility.observe(canvas);

    draw();

    /* Faded up only once the first frame exists, so the canvas never flashes. */
    const raf = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      stop();
      visibility.disconnect();
      observer.disconnect();
      globe.destroy();
    };
  }, [markers, arcs]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[34rem]",
        className,
      )}
    >
      {/*
        The light the globe stands in.

        A CSS wash rather than cobe's own `glowColor`, which lights the sphere
        from within and cannot reach past its edge. This is what stops a white
        globe on a near-white field reading as a hole in the page.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.10),rgba(109,74,255,0.07)_52%,transparent_72%)] blur-2xl"
      />

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="relative size-full opacity-0 transition-opacity duration-700 ease-[var(--ease-emphasized)] [contain:layout_paint_size]"
      />

      {/*
        The names.

        `aria-hidden`, because the canvas above carries the accessible
        description and the list beside the globe states every market in text.
        A screen reader should not hear the same countries a third time.
      */}
      <div
        ref={labelLayerRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {markers.map((marker) =>
          marker.label ? (
            /*
              Anchored on the dot, drawing upward.

              The wrapper is a zero-size point sitting exactly where the marker
              is, and the leader and the card are positioned off it. That is
              what makes the connector correct by construction: there is one
              coordinate, written once per frame, and the line starts at it.
            */
            <span
              key={marker.id}
              data-marker={marker.id}
              className="absolute top-0 left-0 size-0 opacity-0 transition-opacity duration-200 will-change-transform"
              style={{ visibility: "hidden" }}
            >
              {/* The leader: one pixel, fading into the dot it points at. */}
              <span
                className="absolute bottom-[7px] left-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-brand/50 to-brand/15"
                style={{ height: LEADER_LENGTH }}
              />
              {/* The collar, so the line lands on something rather than stopping. */}
              <span className="absolute bottom-[4px] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-white ring-1 ring-brand/40" />

              <span
                data-card
                className="absolute left-1/2 flex items-center gap-1.5 rounded-full border border-ink/[0.07] bg-white/95 py-1 pr-2.5 pl-1.5 whitespace-nowrap shadow-[0_1px_2px_rgba(11,27,54,0.05),0_10px_24px_-16px_rgba(11,27,54,0.5)] backdrop-blur-[2px]"
                style={{
                  bottom: LEADER_LENGTH + 5,
                  transform: "translateX(calc(-50% + var(--nudge, 0px)))",
                }}
              >
                {marker.label}
              </span>
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
}
