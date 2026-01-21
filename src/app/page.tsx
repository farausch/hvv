'use client';

import { useEffect, useState } from 'react';
import type { DeparturesResponse } from './lib/types';
import DepartureList from './components/DepartureList';

export default function Home() {
  const [departures, setDepartures] = useState<DeparturesResponse | null>(null);

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const response = await fetch('/api/departures');
        const data = await response.json();
        setDepartures(data);
      } catch (error) {
        console.error('Error fetching departures:', error);
      }
    };

    fetchDepartures();
    const interval = setInterval(fetchDepartures, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!departures) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <DepartureList departures={departures} />
      </main>
    </div>
  );
}
