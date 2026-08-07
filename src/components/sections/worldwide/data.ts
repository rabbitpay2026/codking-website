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
  | "united-states";

export interface Country {
  readonly id: CountryId;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}

export interface WorldStat {
  readonly value: number;
  readonly label: string;
  readonly decimalPlaces?: number;
  readonly suffix?: string;
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
] as const;

export const worldStats: readonly WorldStat[] = [
  { value: 100, label: "Countries", suffix: "+" },
  { value: 10000, label: "Merchants", suffix: "+" },
  { value: 10, label: "Orders Processed", suffix: "M+" },
  { value: 99.9, label: "Service Availability", decimalPlaces: 1, suffix: "%" },
] as const;
