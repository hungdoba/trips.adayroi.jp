import { TripTag } from '@/constants';

export interface Media {
  src: string;
  alt: string;
  caption: string;
}

export interface Trip {
  id: number;
  date: string;
  title: string;
  tag: TripTag;
  address: string;
  mapUrl: string;
  images: Media[];
  videos: Media[];
}

export interface TripFilters {
  tag?: TripTag;
  year?: number;
  search?: string;
}

export interface TripSortOptions {
  field: 'date' | 'id' | 'title';
  direction: 'asc' | 'desc';
}

export type TripWithSlug = Trip & {
  slug: string;
};

// Legacy type for backward compatibility
export type Log = {
  timestamp: string;
  title: string;
  content: string;
  tag?: string;
  author?: string;
};
