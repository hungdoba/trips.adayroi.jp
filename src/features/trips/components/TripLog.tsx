import { Trip } from '@/features/trips/types';
import { Badge } from '@/components/ui/badge';
import { TRIP_IMAGES_PATH, VIDEO_PATH } from '@/constants';
import { formatDateCompact } from '@/utils';
import ExportedImage from 'next-image-export-optimizer';
import MapLink from '@/components/MapLink';
import Video from '@/components/Video';

interface TripLogProps {
  trip: Trip;
  priority?: boolean;
}

export default function TripLog({ trip, priority = false }: TripLogProps) {
  return (
    <article className="md:flex p-4 md:p-0">
      <h2 className="content-date h-full mt-px">
        {formatDateCompact(trip.date)}
      </h2>
      <div className="content-block">
        <div className="feed-border"></div>
        <div className="feed-dot"></div>
        <Badge className={'absolute -top-6 right-0 md:static mb-4'}>
          {trip.tag}
        </Badge>

        <h1 className="text-xl sm:text-3xl font-bold mb-4">{trip.title}</h1>

        {trip.images.map((image, index) => (
          <div key={`image-${trip.id}-${index}`} className="flex">
            <ExportedImage
              src={`${TRIP_IMAGES_PATH}/${image.src}`}
              alt={image.alt || `${trip.title} - Image ${index + 1}`}
              priority={priority}
              width={100}
              height={100}
              sizes="100vw"
              className="rounded-md mb-4 w-full h-auto"
            />
            {image.caption && (
              <p className="text-sm text-gray-500 mt-2">{image.caption}</p>
            )}
          </div>
        ))}

        {trip.videos.map((video, index) => (
          <div key={`video-${trip.id}-${index}`} className="mb-4">
            <Video src={`${VIDEO_PATH}/${video.src}`} />
            {video.caption && (
              <p className="text-sm text-gray-500 mt-2">{video.caption}</p>
            )}
          </div>
        ))}

        <MapLink address={trip.address} mapUrl={trip.mapUrl} />
      </div>
    </article>
  );
}
