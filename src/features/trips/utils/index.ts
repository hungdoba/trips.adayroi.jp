import fs from 'fs';
import path from 'path';
import { Trip, TripFilters, TripSortOptions } from '@/features/trips/types';
import { sortTripsById, sortTripsByDate } from '@/utils';

/**
 * Read trip data from JSON file
 */
export function readTripsData(): Trip[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'trips.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as Trip[];
  } catch (error) {
    console.error('Error reading trips data:', error);
    throw new Error('Failed to load trips data');
  }
}

/**
 * Get a specific trip by ID
 */
export function getTripById(id: number): Trip | null {
  const trips = readTripsData();
  return trips.find((trip) => trip.id === id) || null;
}

/**
 * Filter trips based on criteria
 */
export function filterTrips(trips: Trip[], filters: TripFilters): Trip[] {
  let filteredTrips = [...trips];

  if (filters.tag) {
    filteredTrips = filteredTrips.filter((trip) => trip.tag === filters.tag);
  }

  if (filters.year) {
    filteredTrips = filteredTrips.filter((trip) => {
      const tripYear = new Date(trip.date).getFullYear();
      return tripYear === filters.year;
    });
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredTrips = filteredTrips.filter(
      (trip) =>
        trip.title.toLowerCase().includes(searchLower) ||
        trip.address.toLowerCase().includes(searchLower) ||
        trip.tag.toLowerCase().includes(searchLower)
    );
  }

  return filteredTrips;
}

/**
 * Sort trips based on options
 */
export function sortTrips(trips: Trip[], options: TripSortOptions): Trip[] {
  const sorted = [...trips];

  switch (options.field) {
    case 'date':
      sorted.sort((a, b) => {
        const comparison = sortTripsByDate(a, b);
        return options.direction === 'asc' ? -comparison : comparison;
      });
      break;
    case 'id':
      sorted.sort((a, b) => {
        const comparison = sortTripsById(a, b);
        return options.direction === 'asc' ? -comparison : comparison;
      });
      break;
    case 'title':
      sorted.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return options.direction === 'asc' ? comparison : -comparison;
      });
      break;
  }

  return sorted;
}

/**
 * Get unique years from all trips
 */
export function getTripYears(): number[] {
  const trips = readTripsData();
  const years = trips.map((trip) => new Date(trip.date).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}

/**
 * Get unique tags from all trips
 */
export function getTripTags(): string[] {
  const trips = readTripsData();
  const tags = trips.map((trip) => trip.tag);
  return [...new Set(tags)].sort();
}

/**
 * Get trips with pagination
 */
export function getPaginatedTrips(
  page: number = 1,
  limit: number = 20,
  filters?: TripFilters,
  sortOptions?: TripSortOptions
): {
  trips: Trip[];
  totalTrips: number;
  totalPages: number;
  currentPage: number;
} {
  let trips = readTripsData();

  // Apply filters
  if (filters) {
    trips = filterTrips(trips, filters);
  }

  // Apply sorting
  if (sortOptions) {
    trips = sortTrips(trips, sortOptions);
  } else {
    // Default sort by ID (newest first)
    trips = sortTrips(trips, { field: 'id', direction: 'desc' });
  }

  const totalTrips = trips.length;
  const totalPages = Math.ceil(totalTrips / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTrips = trips.slice(startIndex, endIndex);

  return {
    trips: paginatedTrips,
    totalTrips,
    totalPages,
    currentPage: page,
  };
}
