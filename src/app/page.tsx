'use client';

import { useEffect, useState } from 'react';
import type { DeparturesResponse, PayloadTypeKeys } from './lib/types';
import { PayloadTypes } from './lib/types';
import DepartureList from './components/DepartureList';
import DepartureTypeDropdown from './components/DepartureTypeDropdown';

export default function Home() {
  const [departures, setDepartures] = useState<DeparturesResponse | null>(null);
  const [departureType, setDepartureType] = useState<PayloadTypeKeys>(PayloadTypes.BIBI_LEAVE);

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const response = await fetch(`/api/departures?type=${departureType}`);
        const data = await response.json();
        setDepartures(data);
      } catch (error) {
        console.error('Error fetching departures:', error);
      }
    };

    fetchDepartures();
    const interval = setInterval(fetchDepartures, 20000);

    return () => clearInterval(interval);
  }, [departureType]);

  if (!departures) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center px-8 py-8 bg-white dark:bg-black">
        <DepartureTypeDropdown value={departureType} onChange={setDepartureType} />
        <hr className="my-4 w-full border-zinc-200 dark:border-zinc-800" />
        <DepartureList departures={departures} />
      </main>
    </div>
  );
}
