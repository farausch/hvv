import { NextResponse } from 'next/server';
import { getDepartures } from '@/app/lib/departures';
import { PAYLOAD_CONFIGS, PayloadTypes } from '@/app/lib/types';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || PayloadTypes.BUBU_LEAVE;
    
    const config = PAYLOAD_CONFIGS[type as keyof typeof PAYLOAD_CONFIGS];
    const payload = config?.payload || PAYLOAD_CONFIGS[PayloadTypes.BUBU_LEAVE].payload;
    
    const data = await getDepartures(payload);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error fetching departures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departures' },
      {
        status: 500,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  }
}