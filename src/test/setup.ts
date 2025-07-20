import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    setTheme: vi.fn(),
  })),
}));

// Mock next-image-export-optimizer with proper loading attribute handling
vi.mock('next-image-export-optimizer', () => {
  const MockImage = React.forwardRef<
    HTMLImageElement,
    React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }
  >(({ src, alt, className, priority, ...props }, ref) => {
    const loading = priority === false ? 'lazy' : 'eager';
    return React.createElement('img', {
      src,
      alt,
      className,
      loading,
      ref,
      ...props,
    });
  });

  MockImage.displayName = 'MockImage';

  return {
    default: MockImage,
  };
});
