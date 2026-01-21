import crypto from 'crypto';
import type { DeparturesResponse } from './types';

const HVV_BASE_URL = 'http://gti.geofox.de/gti/public/';
const HVV_API_USER = process.env.HVV_API_USER || '';
const HVV_API_KEY = process.env.HVV_API_KEY || '';

const standardPayload = {
  version: 47,
  stations: [
    { name: 'Moltrechtweg', id: 'Master:90018', city: 'Hamburg', type: 'STATION' },
    { name: 'Suhrenkamp', id: 'Master:91031', city: 'Hamburg', type: 'STATION' }
  ],
  filter: [
    { serviceID: 'HHA-B:23_HHA-B', stationIDs: ['Master:90031'] },
    { serviceID: 'HHA-B:28_HHA-B', stationIDs: ['Master:90031'] },
    { serviceID: 'HHA-B:174_HHA-B', stationIDs: ['Master:90038'] },
    { serviceID: 'HHA-B:218_HHA-B', stationIDs: ['Master:90030'] }
  ],
  time: { time: 'jetzt' },
  maxList: 15,
  allStationsInChangingNode: 'true',
  maxTimeOffset: 200,
  useRealtime: 'true'
};

function getSignature(requestBody: unknown, secretKey: string): string {
  const hmac = crypto.createHmac('sha1', secretKey);
  hmac.update(JSON.stringify(requestBody));
  return hmac.digest('base64');
}

export async function getDepartures(): Promise<DeparturesResponse> {
  const service = 'departureList';
  const url = HVV_BASE_URL + service;
  
  const payload = { ...standardPayload };
  const signature = getSignature(payload, HVV_API_KEY);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'geofox-auth-type': 'HmacSHA1',
    'geofox-auth-user': HVV_API_USER,
    'geofox-auth-signature': signature,
    'Host': 'gti.geofox.de',
    'Connection': 'Keep-Alive'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch departures');
  }

  return response.json() as Promise<DeparturesResponse>;
}
