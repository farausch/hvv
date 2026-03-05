import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    time: "12:00",
    departures: [
      { line: "28", direction: "U Wandsbek Markt", in: 5 },
      { line: "218", direction: "Heukoppel", in: 10 }
    ]
  });
}