export interface HVVTime {
  date: string;
  time: string;
}

export interface LineType {
  simpleType: string;
  shortInfo: string;
  longInfo: string;
  model: string;
}

export interface Line {
  name: string;
  direction: string;
  origin: string;
  type: LineType;
  id: string;
  dlid: string;
}

export interface Station {
  combinedName: string;
  id: string;
  globalId: string;
}

export interface Attribute {
  isPlanned: boolean;
  value: string;
  types: string[];
}

export interface Departure {
  line: Line;
  directionId: number;
  timeOffset: number;
  delay?: number;
  serviceId: number;
  station: Station;
  attributes?: Attribute[];
}

export interface DeparturesResponse {
  returnCode: string;
  time: HVVTime;
  departures: Departure[];
}
