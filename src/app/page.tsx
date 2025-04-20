import LogPost from '@/components/LogPost';
import { getContent } from '@/lib/content';

export default async function Home() {
  const content = await getContent();
  return (
    <main className="max-w-none prose dark:prose-invert mt-8">
      <section className="relative mx-auto">
        {content.map((log, index) => (
          <LogPost key={index} log={log} />
        ))}
      </section>
    </main>
  );
}
