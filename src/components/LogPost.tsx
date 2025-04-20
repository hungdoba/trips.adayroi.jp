import { Log } from '@/types/Log';
import { Badge } from './ui/badge';

interface Props {
  log: Log;
}

export default function LogPost({ log }: Props) {
  return (
    <article className="md:flex">
      <h2 className="content-date h-full mt-px">
        <a>{log.timestamp}</a>
      </h2>
      <div className="content-block pb-20">
        <div className="feed-border"></div>
        <div className="feed-dot"></div>
        <Badge className={'absolute -top-6 right-0 md:static mb-4'}>
          {log.tag}
        </Badge>

        <h1 className="text-xl sm:text-3xl font-bold mb-4">{log.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: log.content }} />
        <p>{log.author}</p>
      </div>
    </article>
  );
}
