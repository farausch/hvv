import type { DeparturesResponse } from '../lib/types';

interface DepartureListProps {
  departures: DeparturesResponse;
}

export default function DepartureList({ departures }: DepartureListProps) {
  
  const getDepartureTime = (offsetMinutes: number) => {
    const [hours, minutes] = departures.time.time.split(':').map(Number);
    const currentTime = new Date();
    currentTime.setHours(hours, minutes, 0, 0);
    const departureTime = new Date(currentTime.getTime() + offsetMinutes * 60 * 1000);
    return departureTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  const hasRealtime = (departure: typeof departures.departures[0]) => {
    return departure.attributes?.some(attr => attr.types.includes('REALTIME')) ?? false;
  };

  return (
    <ul className="w-full space-y-2">
      {departures.departures.map((departure, index) => (
        <li key={index} className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 py-2">
          <div className="flex flex-grow">
            <span 
              className="font-bold text-white bg-red-700 px-3 py-1 text-sm"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)'
              }}
            >
              {departure.line.name}
            </span>
          </div>
          <div className="flex gap-4 items-center flex-shrink-0">
            <span className="w-12 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              {hasRealtime(departure) && (
                <>
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></span>
                  LIVE
                </>
              )}
            </span>
            <span className="w-10 text-right">{getDepartureTime(departure.timeOffset)}</span>
            <span className="text-red-600 dark:text-red-400 w-8 text-right">
              {departure.delay !== undefined && departure.delay > 0 ? `+${departure.delay / 60}` : ''}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
