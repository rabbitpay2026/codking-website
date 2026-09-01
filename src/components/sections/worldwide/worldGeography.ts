import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

/** The only property the atlas gives a country that this map has any use for. */
export interface CountryProperties {
  readonly name: string;
}

export type CountryFeature = Feature<Geometry, CountryProperties>;

export interface WorldGeography {
  /** One feature per country, for the outlines and the fills. */
  readonly countries: readonly CountryFeature[];
  /**
   * The same countries as one collection, which is what the projection is fitted
   * to. Fitting to the countries rather than to the projection's own extent is
   * what makes the drawing fill its frame: the extent runs pole to pole, so
   * fitting to that reserves the height of an Antarctica that is not drawn.
   */
  readonly landmass: FeatureCollection<Geometry, CountryProperties>;
}

/**
 * Everything the atlas has below the frame.
 *
 * Antarctica is excluded because nothing ships there, and at this projection it
 * is a band across the bottom that pushes every inhabited continent upward. The
 * French Southern and Antarctic Lands go with it for the same reason — a
 * scattering of sub-antarctic islands that are invisible at this size but drag
 * the fitted bounds south all the same.
 */
const OUTSIDE_FRAME = new Set(["010", "260"]);

let pending: Promise<WorldGeography> | null = null;

/**
 * The world, loaded once per page.
 *
 * Both the atlas and the TopoJSON decoder are imported here rather than at
 * module scope, which keeps 64KB of geography and its decoder out of the
 * initial bundle — this map sits well below the fold, and a visitor who never
 * reaches it should not pay for it. The promise is cached at module scope, so a
 * remount, a second instance or React's development double-effect all share the
 * one fetch and the one decode.
 */
export function loadWorldGeography(): Promise<WorldGeography> {
  pending ??= (async () => {
    const [{ feature }, atlas] = await Promise.all([
      import("topojson-client"),
      import("world-atlas/countries-110m.json"),
    ]);

    const topology = (atlas.default ?? atlas) as unknown as Topology<{
      countries: GeometryCollection<CountryProperties>;
    }>;

    const collection = feature(
      topology,
      topology.objects.countries,
    ) as FeatureCollection<Geometry, CountryProperties>;

    const countries = collection.features.filter(
      (country) => !OUTSIDE_FRAME.has(String(country.id)),
    );

    return {
      countries,
      landmass: { type: "FeatureCollection", features: countries },
    };
  })();

  return pending;
}
