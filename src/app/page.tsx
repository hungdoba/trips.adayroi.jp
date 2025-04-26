import TripLog from '@/components/TripLog';
import { readDataJson } from '@/lib/content';

export default async function Home() {
  const jsonData = readDataJson();

  return (
    <main className="max-w-none prose dark:prose-invert mt-8">
      <section className="relative mx-auto">
        {jsonData.map((log, index) => (
          <TripLog key={index} trip={log} />
        ))}
      </section>
    </main>
  );
}
