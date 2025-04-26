import fs from 'fs';
import { Trip } from '@/types/Log';

export function readDataJson<T = Trip[]>(): T {
  try {
    const fileContent = fs.readFileSync('content/data.json', 'utf-8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error('Error reading data.json:', error);
    throw error;
  }
}
