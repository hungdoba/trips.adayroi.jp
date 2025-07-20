import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { Logo } from './logo';

// Mock the useTheme hook
const mockUseTheme = vi.mocked(useTheme);

describe('Logo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Theme-based image source', () => {
    it('should render light theme logo when theme is light', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('src', '/assets/images/logos/logo.png');
      });
    });

    it('should render dark theme logo when theme is dark', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'dark',
        resolvedTheme: 'dark',
        forcedTheme: undefined,
      });

      render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute(
          'src',
          '/assets/images/logos/logo-dark.png'
        );
      });
    });

    it('should fallback to light theme logo when theme is undefined', async () => {
      mockUseTheme.mockReturnValue({
        theme: undefined,
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: undefined,
        resolvedTheme: undefined,
        forcedTheme: undefined,
      });

      render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('src', '/assets/images/logos/logo.png');
      });
    });
  });

  describe('Size variants', () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });
    });

    it('should apply small size variant', async () => {
      render(<Logo size="sm" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('h-8', 'w-auto');
      });
    });

    it('should apply default size when no size is specified', async () => {
      render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('h-10', 'w-auto');
      });
    });

    it('should apply large size variant', async () => {
      render(<Logo size="lg" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('h-12', 'w-auto');
      });
    });

    it('should apply extra large size variant', async () => {
      render(<Logo size="xl" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('h-16', 'w-auto');
      });
    });
  });

  describe('Spacing variants', () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });
    });

    it('should apply no spacing when spacing is none', async () => {
      render(<Logo spacing="none" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).not.toHaveClass('pr-2', 'pr-4', 'pr-6');
      });
    });

    it('should apply default spacing when no spacing is specified', async () => {
      render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('pr-4');
      });
    });

    it('should apply small spacing variant', async () => {
      render(<Logo spacing="sm" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('pr-2');
      });
    });

    it('should apply large spacing variant', async () => {
      render(<Logo spacing="lg" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('pr-6');
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });
    });

    it('should have default alt text', async () => {
      render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('alt', 'Logo');
      });
    });

    it('should accept custom alt text', async () => {
      render(<Logo alt="Custom Logo" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('alt', 'Custom Logo');
      });
    });

    it('should be accessible by alt text', async () => {
      render(<Logo alt="Company Logo" />);

      await waitFor(() => {
        expect(screen.getByAltText('Company Logo')).toBeInTheDocument();
      });
    });
  });

  describe('Props and customization', () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });
    });

    it('should accept custom className', async () => {
      render(<Logo className="custom-class" data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('custom-class');
      });
    });

    it('should merge custom className with variant classes', async () => {
      render(
        <Logo
          className="custom-class"
          size="lg"
          spacing="sm"
          data-testid="logo"
        />
      );

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveClass('custom-class', 'h-12', 'w-auto', 'pr-2');
      });
    });

    it('should set priority to true by default', async () => {
      render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('loading', 'eager');
      });
    });

    it('should accept priority prop', async () => {
      render(<Logo priority={false} data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('loading', 'lazy');
      });
    });

    it('should forward additional props to the image element', async () => {
      render(<Logo data-testid="logo" title="Logo Title" id="logo-id" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('title', 'Logo Title');
        expect(logo).toHaveAttribute('id', 'logo-id');
      });
    });
  });

  describe('SSR and hydration', () => {
    it('should handle SSR and hydration properly', () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      // Test that component renders successfully
      // In a real SSR environment, the component would render a placeholder div first,
      // then hydrate to show the actual image
      render(<Logo alt="Test Logo" data-testid="logo" />);

      const logo = screen.getByTestId('logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('alt', 'Test Logo');
    });
  });

  describe('Default and named exports', () => {
    it('should be importable as named export', () => {
      expect(Logo).toBeDefined();
      expect(typeof Logo).toBe('function');
    });
  });
});
