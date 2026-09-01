export type CountryId =
  | "india"
  | "philippines"
  | "united-arab-emirates"
  | "saudi-arabia"
  | "pakistan"
  | "bangladesh"
  | "egypt"
  | "italy"
  | "spain"
  | "united-states"
  | "turkey"
  | "vietnam"
  | "thailand"
  | "oman";

/**
 * One supported market.
 *
 * The single record the whole section is built from: the list on the right
 * renders it, the globe marks it, and the label floating beside the marker is
 * assembled from the same fields. There is deliberately no second dataset for
 * the globe — a marker that disagreed with the row beside it would be worse
 * than no marker at all. The artwork is not held here because it is a
 * component rather than a file; `flags.tsx` maps it from `id`, and that map is
 * total, so a country cannot be added without one.
 */
export interface Country {
  readonly id: CountryId;
  readonly name: string;
  /**
   * ISO 3166-1 alpha-2, and the join between three things.
   *
   * The map places this market's marker on the country's own polygon through
   * amCharts' `polygonIdField`, which keys on exactly this code; the flag in
   * the tooltip is `/flags/<lowercased>.svg`; and the geodata's own feature
   * ids are the same list. One code, so a marker cannot end up on a different
   * country from the flag beside it.
   */
  readonly iso: string;
  /** Fallback position, for a market the geodata has no polygon for. */
  readonly lat: number;
  readonly lng: number;
}

export const countries: readonly Country[] = [
  { id: "india", name: "India", iso: "IN", lat: 22.9734, lng: 78.6569 },
  { id: "philippines", name: "Philippines", iso: "PH", lat: 12.8797, lng: 121.774 },
  {
    id: "united-arab-emirates",
    name: "United Arab Emirates",
    iso: "AE",
    lat: 23.4241,
    lng: 53.8478,
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    iso: "SA",
    lat: 23.8859,
    lng: 45.0792,
  },
  { id: "pakistan", name: "Pakistan", iso: "PK", lat: 30.3753, lng: 69.3451 },
  { id: "bangladesh", name: "Bangladesh", iso: "BD", lat: 23.685, lng: 90.3563 },
  { id: "egypt", name: "Egypt", iso: "EG", lat: 26.8206, lng: 30.8025 },
  { id: "italy", name: "Italy", iso: "IT", lat: 41.8719, lng: 12.5674 },
  { id: "spain", name: "Spain", iso: "ES", lat: 40.4637, lng: -3.7492 },
  {
    id: "united-states",
    name: "United States",
    iso: "US",
    lat: 37.0902,
    lng: -95.7129,
  },
  /*
    The four below are the operator repository's own coverage, not additions
    made to fill a grid. `data/smsOperators.ts` is the "Local SMS Operators"
    dropdown in the COD King dashboard, transcribed row for row, and each of
    these is a country one of those operators is listed as covering — Turkey,
    Vietnam, Thailand and Oman. A country the product ships a local operator
    for is a country the product operates in, which is the only evidence this
    list will accept.
  */
  { id: "turkey", name: "Turkey", iso: "TR", lat: 38.9637, lng: 35.2433 },
  { id: "vietnam", name: "Vietnam", iso: "VN", lat: 14.0583, lng: 108.2772 },
  { id: "thailand", name: "Thailand", iso: "TH", lat: 15.87, lng: 100.9925 },
  { id: "oman", name: "Oman", iso: "OM", lat: 21.4735, lng: 55.9754 },
] as const;
