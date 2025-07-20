'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import ExportedImage from 'next-image-export-optimizer';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const logoVariants = cva(
  'rounded object-contain transition-opacity duration-200',
  {
    variants: {
      size: {
        sm: 'h-8 w-auto',
        default: 'h-10 w-auto',
        lg: 'h-12 w-auto',
        xl: 'h-16 w-auto',
      },
      spacing: {
        none: '',
        sm: 'pr-2',
        default: 'pr-4',
        lg: 'pr-6',
      },
    },
    defaultVariants: {
      size: 'default',
      spacing: 'default',
    },
  }
);

interface LogoProps
  extends Omit<
      React.ComponentProps<typeof ExportedImage>,
      'src' | 'alt' | 'width' | 'height'
    >,
    VariantProps<typeof logoVariants> {
  /**
   * Alternative text for the logo image
   */
  alt?: string;
  /**
   * Priority loading for the image
   */
  priority?: boolean;
}

/**
 * Logo component that automatically switches between light and dark theme variants
 *
 * @param size - Size variant of the logo (sm, default, lg, xl)
 * @param spacing - Right padding spacing (none, sm, default, lg)
 * @param alt - Alternative text for accessibility
 * @param priority - Whether to prioritize loading this image
 * @param className - Additional CSS classes to apply
 */
export function Logo({
  size,
  spacing,
  alt = 'Logo',
  priority = true,
  className,
  ...props
}: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by waiting for component to mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show a placeholder during SSR/hydration to prevent layout shift
  if (!mounted) {
    return (
      <div
        className={cn(logoVariants({ size, spacing }), className)}
        aria-label={alt}
      />
    );
  }

  const logoSrc =
    theme === 'dark'
      ? '/assets/images/logos/logo-dark.png'
      : '/assets/images/logos/logo.png';

  return (
    <ExportedImage
      src={logoSrc}
      priority={priority}
      width={430}
      height={148}
      className={cn(logoVariants({ size, spacing }), className)}
      alt={alt}
      {...props}
    />
  );
}

// Keep default export for backward compatibility
export default Logo;
