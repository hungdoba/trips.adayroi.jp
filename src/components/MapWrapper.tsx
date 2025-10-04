'use client';

import dynamic from 'next/dynamic';
import { Trip } from '@/features/trips/types';

// Dynamically import the map component to avoid SSR issues
const MapWidget = dynamic(() => import('./MapWidget'), {
  ssr: false,
  loading: () => null,
});

interface MapWrapperProps {
  trips: Trip[];
}

export default function MapWrapper({ trips }: MapWrapperProps) {
  return <MapWidget trips={trips} />;
}
