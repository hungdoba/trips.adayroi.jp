import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface Props {
  address: string;
  mapUrl: string;
}

export default function MapLink({ address, mapUrl }: Props) {
  return (
    <Link
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center no-underline"
    >
      <MapPin className="w-4 h-4 mr-1 text-green-500" />
      <span className="inline-flex items-center text-gray-400">{address}</span>
    </Link>
  );
}
