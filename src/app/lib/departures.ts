import crypto from 'crypto';
import type { DeparturesResponse } from './types';

const HVV_BASE_URL = 'https://gti.geofox.de/gti/public/';
const HVV_API_USER = process.env.HVV_API_USER || '';
const HVV_API_KEY = process.env.HVV_API_KEY || '';

function getSignature(requestBody: unknown, secretKey: string): string {
  const hmac = crypto.createHmac('sha1', secretKey);
  hmac.update(JSON.stringify(requestBody));
  return hmac.digest('base64');
}

export async function getDepartures(payload: unknown): Promise<DeparturesResponse> {
  const service = 'departureList';
  const url = HVV_BASE_URL + service;
  const signature = getSignature(payload, HVV_API_KEY);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'geofox-auth-type': 'HmacSHA1',
    'geofox-auth-user': HVV_API_USER,
    'geofox-auth-signature': signature
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Failed to fetch departures:', response.status, response.statusText, errorBody);
    throw new Error('Failed to fetch departures');
  }

  return response.json() as Promise<DeparturesResponse>;
}
