import { TripLog } from '@/features/trips';
import { readTripsData, sortTrips } from '@/features/trips/utils';

export default async function Home() {
  const trips = readTripsData();
  const sortedTrips = sortTrips(trips, { field: 'id', direction: 'desc' });

  return (
    <main className="max-w-none prose dark:prose-invert mt-8">
      <section className="relative mx-auto">
        {sortedTrips.map((trip, index) => (
          <TripLog key={trip.id} trip={trip} priority={index < 5} />
        ))}
      </section>
    </main>
  );
}
