// App constants
export const APP_NAME = 'Trips - hungba.net';
export const APP_DESCRIPTION = 'Personal travel log and trip diary';
export const APP_URL = 'https://trips.hungba.net';

// Image paths
export const IMAGES_PATH = '/images';
export const TRIP_IMAGES_PATH = `${IMAGES_PATH}/trips`;
export const LOGO_PATH = `${IMAGES_PATH}/logos`;
export const VIDEO_PATH = '/videos';

// Trip tags
export const TRIP_TAGS = {
  STUDY: 'study',
  HOME: 'home',
  TRAVEL: 'travel',
  WORK: 'work',
  FOOD: 'food',
  NATURE: 'nature',
  CITY: 'city',
  ADVENTURE: 'adventure',
} as const;

export type TripTag = (typeof TRIP_TAGS)[keyof typeof TRIP_TAGS];

// UI constants
export const MAX_IMAGES_PER_TRIP = 10;
export const TRIPS_PER_PAGE = 20;
export const IMAGE_QUALITY = 80;

// Navigation
export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/terms', label: 'Terms' },
] as const;
