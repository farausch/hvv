import { payloadBubuLeave, payloadBibiLeave } from './payload';

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

export interface PayloadConfig {
  key: string;
  displayName: string;
  payload: unknown;
}

export const PayloadTypes = {
  BUBU_LEAVE: 'BUBU_LEAVE',
  BIBI_LEAVE: 'BIBI_LEAVE',
} as const;

export type PayloadTypeKeys = typeof PayloadTypes[keyof typeof PayloadTypes];

export const PAYLOAD_CONFIGS: Record<PayloadTypeKeys, PayloadConfig> = {
  [PayloadTypes.BUBU_LEAVE]: {
    key: PayloadTypes.BUBU_LEAVE,
    displayName: 'Bubu Leave',
    payload: payloadBubuLeave,
  },
  [PayloadTypes.BIBI_LEAVE]: {
    key: PayloadTypes.BIBI_LEAVE,
    displayName: 'Bibi Leave',
    payload: payloadBibiLeave,
  },
};
