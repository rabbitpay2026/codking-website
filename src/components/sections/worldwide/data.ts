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
  readonly lat: number;
  readonly lng: number;
}

export const countries: readonly Country[] = [
  { id: "india", name: "India", lat: 22.9734, lng: 78.6569 },
  { id: "philippines", name: "Philippines", lat: 12.8797, lng: 121.774 },
  {
    id: "united-arab-emirates",
    name: "United Arab Emirates",
    lat: 23.4241,
    lng: 53.8478,
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    lat: 23.8859,
    lng: 45.0792,
  },
  { id: "pakistan", name: "Pakistan", lat: 30.3753, lng: 69.3451 },
  { id: "bangladesh", name: "Bangladesh", lat: 23.685, lng: 90.3563 },
  { id: "egypt", name: "Egypt", lat: 26.8206, lng: 30.8025 },
  { id: "italy", name: "Italy", lat: 41.8719, lng: 12.5674 },
  { id: "spain", name: "Spain", lat: 40.4637, lng: -3.7492 },
  {
    id: "united-states",
    name: "United States",
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
  { id: "turkey", name: "Turkey", lat: 38.9637, lng: 35.2433 },
  { id: "vietnam", name: "Vietnam", lat: 14.0583, lng: 108.2772 },
  { id: "thailand", name: "Thailand", lat: 15.87, lng: 100.9925 },
  { id: "oman", name: "Oman", lat: 21.4735, lng: 55.9754 },
] as const;
