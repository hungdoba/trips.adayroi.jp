'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Trip } from '@/features/trips/types';
import L from 'leaflet';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ScrollMapWidgetProps {
  trips: Trip[];
}

const getLocationFromTrip = (trip: Trip): { lat: number; lng: number } => {
  if (
    trip.coordinates &&
    typeof trip.coordinates.lat === 'number' &&
    typeof trip.coordinates.lng === 'number' &&
    trip.coordinates.lat !== null &&
    trip.coordinates.lng !== null &&
    !isNaN(trip.coordinates.lat) &&
    !isNaN(trip.coordinates.lng)
  ) {
    return { lat: trip.coordinates.lat, lng: trip.coordinates.lng };
  }
  // Default to Tokyo if no valid coordinates
  return { lat: 35.6762, lng: 139.6503 };
};

const createMarkerIcon = () => {
  return new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [20, 33],
    iconAnchor: [10, 33],
    shadowSize: [33, 33],
  });
};

export default function MapWidget({ trips }: ScrollMapWidgetProps) {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mappableTrips = trips.filter((trip) => {
    const hasMedia = trip.images.length > 0 || trip.videos.length > 0;
    const hasValidCoordinates =
      trip.coordinates &&
      typeof trip.coordinates.lat === 'number' &&
      typeof trip.coordinates.lng === 'number' &&
      trip.coordinates.lat !== null &&
      trip.coordinates.lng !== null &&
      !isNaN(trip.coordinates.lat) &&
      !isNaN(trip.coordinates.lng);

    return hasMedia && hasValidCoordinates;
  });

  const currentLocation = currentTrip ? getLocationFromTrip(currentTrip) : null;

  const getCurrentVisibleTrip = useCallback((): Trip | null => {
    const articles = document.querySelectorAll('article[id^="trip-"]');
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const viewportCenter = scrollTop + windowHeight / 2;

    let bestTrip: Trip | null = null;
    let minDistance = Infinity;

    articles.forEach((article) => {
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + scrollTop;
      const articleBottom = articleTop + rect.height;
      const articleCenter = articleTop + rect.height / 2;

      // Check if article is visible in viewport
      const isVisible =
        articleBottom > scrollTop && articleTop < scrollTop + windowHeight;

      if (isVisible) {
        const distance = Math.abs(articleCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          const articleId =
            (article as HTMLElement).getAttribute('id') || 'trip-0';
          const tripId = parseInt(articleId.replace('trip-', '') || '0');
          const foundTrip = mappableTrips.find((trip) => trip.id === tripId);
          if (foundTrip) {
            bestTrip = foundTrip;
          }
        }
      }
    });

    return bestTrip;
  }, [mappableTrips]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const visibleTrip = getCurrentVisibleTrip();

        if (visibleTrip && visibleTrip.id !== currentTrip?.id) {
          setCurrentTrip(visibleTrip);
        }
      }, 100); // Reduced timeout for more responsive updates
    };

    // Set initial trip if none is selected
    if (mappableTrips.length > 0 && !currentTrip) {
      setCurrentTrip(mappableTrips[0]);
    }

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });

    // Initial call to set the current trip
    const initialTimer = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
      clearTimeout(initialTimer);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentTrip, mappableTrips, getCurrentVisibleTrip]);

  useEffect(() => {
    if (
      mapRef.current &&
      currentLocation &&
      !isNaN(currentLocation.lat) &&
      !isNaN(currentLocation.lng)
    ) {
      const map = mapRef.current;

      map.flyTo([currentLocation.lat, currentLocation.lng], 10, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [currentLocation, currentTrip]);

  if (
    mappableTrips.length === 0 ||
    !currentTrip ||
    !currentLocation ||
    isNaN(currentLocation.lat) ||
    isNaN(currentLocation.lng)
  ) {
    return null;
  }

  return (
    <div>
      {/* Desktop: Always visible map */}
      <div className="hidden lg:block fixed bottom-6 left-6 z-40 transition-all duration-300">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
          <div className="w-80 h-48 relative">
            <MapContainer
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={8}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
              attributionControl={false}
              zoomControl={false}
              scrollWheelZoom={true}
              doubleClickZoom={true}
              dragging={true}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[currentLocation.lat, currentLocation.lng]}
                icon={createMarkerIcon()}
              />
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Mobile: Collapsible map */}
      <div className="lg:hidden fixed bottom-6 right-4 z-40">
        {!isExpanded ? (
          /* Minimized state - Map button */
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-2xl transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </button>
        ) : (
          /* Expanded state - Full width map */
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm w-[calc(100vw-2rem)] relative">
            {/* Close button - positioned outside map container */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 z-[1000] bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="absolute bottom-2 left-2 z-[1000] bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
              {
                mappableTrips.findLast((trip) => trip.id === currentTrip.id)
                  ?.address
              }
            </div>

            <div
              className="relative"
              style={{ height: '60vw', maxHeight: '300px' }}
            >
              <MapContainer
                center={[currentLocation.lat, currentLocation.lng]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
                ref={mapRef}
                attributionControl={false}
                zoomControl={false}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                dragging={true}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[currentLocation.lat, currentLocation.lng]}
                  icon={createMarkerIcon()}
                />
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
