import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { Logo } from './logo';

// Mock the useTheme hook
const mockUseTheme = vi.mocked(useTheme);

describe('Logo Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Real-world usage scenarios', () => {
    it('should handle theme switching correctly', async () => {
      let currentTheme = 'light';
      const mockSetTheme = vi.fn((theme) => {
        currentTheme = theme;
      });

      // Initial light theme
      mockUseTheme.mockReturnValue({
        theme: currentTheme,
        setTheme: mockSetTheme,
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      const { rerender } = render(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('src', '/assets/images/logos/logo.png');
      });

      // Switch to dark theme
      currentTheme = 'dark';
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme,
        themes: ['light', 'dark'],
        systemTheme: 'dark',
        resolvedTheme: 'dark',
        forcedTheme: undefined,
      });

      rerender(<Logo data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute(
          'src',
          '/assets/images/logos/logo-dark.png'
        );
      });
    });

    it('should work in navbar-like context with proper sizing', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      const NavbarComponent = () => (
        <nav className="flex items-center justify-between p-4">
          <Logo size="sm" spacing="lg" />
          <div>Navigation items</div>
        </nav>
      );

      render(<NavbarComponent />);

      await waitFor(() => {
        const logo = screen.getByAltText('Logo');
        expect(logo).toHaveClass('h-8', 'pr-6');
      });
    });

    it('should work in footer context with larger size', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'dark',
        resolvedTheme: 'dark',
        forcedTheme: undefined,
      });

      const FooterComponent = () => (
        <footer className="p-8">
          <Logo size="xl" spacing="none" alt="Company Footer Logo" />
        </footer>
      );

      render(<FooterComponent />);

      await waitFor(() => {
        const logo = screen.getByAltText('Company Footer Logo');
        expect(logo).toHaveClass('h-16');
        expect(logo).not.toHaveClass('pr-2', 'pr-4', 'pr-6');
        expect(logo).toHaveAttribute(
          'src',
          '/assets/images/logos/logo-dark.png'
        );
      });
    });

    it('should handle responsive design classes', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      render(
        <Logo
          className="sm:h-8 md:h-10 lg:h-12"
          data-testid="responsive-logo"
        />
      );

      await waitFor(() => {
        const logo = screen.getByTestId('responsive-logo');
        expect(logo).toHaveClass('sm:h-8', 'md:h-10', 'lg:h-12');
      });
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle missing theme gracefully', async () => {
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
        // Should fallback to light theme
        expect(logo).toHaveAttribute('src', '/assets/images/logos/logo.png');
      });
    });

    it('should handle very long alt text', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      const longAltText =
        'This is a very long alt text that describes the logo in great detail for accessibility purposes and screen readers';

      render(<Logo alt={longAltText} data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('alt', longAltText);
      });
    });

    it('should maintain aspect ratio with different sizes', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      const sizes = ['sm', 'default', 'lg', 'xl'] as const;

      for (const size of sizes) {
        const { unmount } = render(
          <Logo size={size} data-testid={`logo-${size}`} />
        );

        await waitFor(() => {
          const logo = screen.getByTestId(`logo-${size}`);
          expect(logo).toHaveAttribute('width', '430');
          expect(logo).toHaveAttribute('height', '148');
          expect(logo).toHaveClass('w-auto'); // Maintains aspect ratio
        });

        unmount();
      }
    });
  });

  describe('Performance considerations', () => {
    it('should set priority loading by default for performance', async () => {
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
        expect(logo).toHaveAttribute('loading', 'eager');
      });
    });

    it('should allow disabling priority loading', async () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined,
      });

      render(<Logo priority={false} data-testid="logo" />);

      await waitFor(() => {
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('loading', 'lazy');
      });
    });
  });
});
