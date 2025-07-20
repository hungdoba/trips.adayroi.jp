import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { vi } from 'vitest';

// Custom render function that includes common providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

// Theme provider mock for testing
export const createMockThemeProvider = (theme: string = 'light') => {
  const mockSetTheme = vi.fn();

  vi.mock('next-themes', () => ({
    useTheme: () => ({
      theme,
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: theme,
      resolvedTheme: theme,
      forcedTheme: undefined,
    }),
  }));

  return { mockSetTheme };
};

// Helper to test component variants
export const testVariants = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  variantProp: keyof T,
  variants: Array<{ value: T[keyof T]; expectedClasses: string[] }>
) => {
  return variants.map(({ value, expectedClasses }) => ({
    props: { [variantProp]: value } as Partial<T>,
    expectedClasses,
  }));
};

// Export all from @testing-library/react for convenience
export * from '@testing-library/react';
export { customRender as render };

// Export common test utilities
export { vi, expect, describe, it, beforeEach, afterEach } from 'vitest';
