import { NextResponse } from 'next/server';
import { getDepartures } from '@/app/lib/departures';

export async function GET() {
  try {
    const data = await getDepartures();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching departures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departures' },
      { status: 500 }
    );
  }
}