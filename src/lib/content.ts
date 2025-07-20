import { readTripsData } from '@/features/trips/utils';
import { Trip } from '@/features/trips/types';

// Legacy function for backward compatibility
export function readDataJson<T = Trip[]>(): T {
  return readTripsData() as T;
}

// Re-export the new trip utilities
export * from '@/features/trips/utils';
