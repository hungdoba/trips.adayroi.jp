import { Trip } from '@/types/Log';
import { Badge } from './ui/badge';
import ExportedImage from 'next-image-export-optimizer';

interface Props {
  trip: Trip;
  priority?: boolean;
}

export default function TripLog({ trip, priority = false }: Props) {
  return (
    <article className="md:flex">
      <h2 className="content-date h-full mt-px">
        <a>{trip.date}</a>
      </h2>
      <div className="content-block pb-20">
        <div className="feed-border"></div>
        <div className="feed-dot"></div>
        <Badge className={'absolute -top-6 right-0 md:static mb-4'}>
          {trip.tag}
        </Badge>

        <h1 className="text-xl sm:text-3xl font-bold mb-4">{trip.title}</h1>
        {trip.images.map((image, index) => (
          <div key={index} className="flex">
            <ExportedImage
              src={image.src}
              alt={image.alt}
              priority={priority}
              width={0}
              height={0}
              sizes="100vw"
              className="mb-4 w-full h-auto"
            />
            {image.caption && (
              <p className="text-sm text-gray-500">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
