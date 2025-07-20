# Logo Component

A modern, theme-aware logo component built with React, TypeScript, and Tailwind CSS. This component automatically switches between light and dark theme variants and provides a flexible API for customization.

## Features

- 🌓 **Automatic theme switching** - Responds to light/dark theme changes
- 📱 **Responsive design** - Multiple size variants with consistent aspect ratios
- ♿ **Accessibility focused** - Proper alt text and ARIA attributes
- 🎨 **Customizable styling** - Variant-based API with className override support
- ⚡ **Performance optimized** - Priority loading and SSR/hydration safe
- 🔧 **TypeScript ready** - Full type safety with comprehensive interfaces

## Installation

```bash
# This component requires the following dependencies:
pnpm add next-themes next-image-export-optimizer class-variance-authority clsx tailwind-merge
```

## Basic Usage

```tsx
import { Logo } from '@/components/ui/logo';

// Basic usage with defaults
<Logo />

// With custom alt text
<Logo alt="Company Logo" />

// Different sizes
<Logo size="sm" />
<Logo size="lg" />
<Logo size="xl" />

// Custom spacing
<Logo spacing="none" />
<Logo spacing="lg" />
```

## Props

| Prop        | Type                                  | Default     | Description                              |
| ----------- | ------------------------------------- | ----------- | ---------------------------------------- |
| `size`      | `'sm' \| 'default' \| 'lg' \| 'xl'`   | `'default'` | Size variant of the logo                 |
| `spacing`   | `'none' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Right padding spacing                    |
| `alt`       | `string`                              | `'Logo'`    | Alternative text for accessibility       |
| `priority`  | `boolean`                             | `true`      | Whether to prioritize loading this image |
| `className` | `string`                              | -           | Additional CSS classes to apply          |

## Size Variants

| Variant   | Classes       | Use Case                         |
| --------- | ------------- | -------------------------------- |
| `sm`      | `h-8 w-auto`  | Navigation bars, compact layouts |
| `default` | `h-10 w-auto` | Standard header usage            |
| `lg`      | `h-12 w-auto` | Prominent header sections        |
| `xl`      | `h-16 w-auto` | Hero sections, footers           |

## Spacing Variants

| Variant   | Classes | Use Case         |
| --------- | ------- | ---------------- |
| `none`    | -       | No right padding |
| `sm`      | `pr-2`  | Tight spacing    |
| `default` | `pr-4`  | Standard spacing |
| `lg`      | `pr-6`  | Generous spacing |

## Theme Support

The component automatically detects the current theme using `next-themes` and switches between:

- **Light theme**: `/assets/images/logos/logo.png`
- **Dark theme**: `/assets/images/logos/logo-dark.png`

Make sure these images exist in your `public` directory.

## Examples

### Navigation Bar

```tsx
<nav className="flex items-center justify-between p-4">
  <Logo size="sm" spacing="lg" />
  <div>Navigation items</div>
</nav>
```

### Hero Section

```tsx
<header className="text-center py-16">
  <Logo size="xl" spacing="none" className="mx-auto mb-8" />
  <h1>Welcome to our site</h1>
</header>
```

### Footer

```tsx
<footer className="p-8">
  <Logo size="lg" alt="Company Footer Logo" />
</footer>
```

### Responsive Design

```tsx
<Logo size="sm" className="sm:h-8 md:h-10 lg:h-12" alt="Responsive Logo" />
```

## SSR and Hydration

The component is designed to be SSR-safe and prevents hydration mismatches by:

1. Rendering a placeholder `div` during initial mount
2. Using `useEffect` to detect when the component has mounted
3. Only rendering the actual image after hydration is complete

## Testing

The component comes with comprehensive tests covering:

- Theme switching functionality
- Size and spacing variants
- Accessibility features
- SSR/hydration behavior
- Integration scenarios
- Performance considerations

Run tests with:

```bash
pnpm test logo
```

## TypeScript

The component is fully typed with:

```tsx
interface LogoProps
  extends Omit<
      React.ComponentProps<typeof ExportedImage>,
      'src' | 'alt' | 'width' | 'height'
    >,
    VariantProps<typeof logoVariants> {
  alt?: string;
  priority?: boolean;
}
```

## Accessibility

- Uses semantic `img` element with proper `alt` attribute
- Provides `aria-label` on placeholder during SSR
- Maintains aspect ratio for consistent layout
- Supports screen readers and keyboard navigation

## Performance

- **Priority loading** enabled by default for above-the-fold logos
- **Optimized images** using `next-image-export-optimizer`
- **Minimal re-renders** with proper memoization
- **Small bundle size** with tree-shakeable exports

## Migration from Legacy

If migrating from an older logo component:

```tsx
// Old usage
<Logo />

// New usage (maintains compatibility)
<Logo />

// Enhanced usage with new features
<Logo size="lg" spacing="sm" alt="Enhanced Logo" />
```

## Contributing

When contributing to this component:

1. **Add tests** for any new functionality
2. **Update documentation** for new props or behavior
3. **Follow TypeScript** best practices
4. **Maintain accessibility** standards
5. **Test SSR behavior** thoroughly

## License

This component is part of the project's UI library and follows the same license terms.
