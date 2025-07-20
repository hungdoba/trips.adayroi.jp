# Project Structure

This document outlines the improved project structure following Next.js 15 best practices.

## Directory Structure

```
trips.adayroi.jp/
├── public/                     # Static assets
│   └── assets/                 # Organized assets
│       ├── images/             # Image assets
│       │   ├── trips/          # Trip-specific images
│       │   └── logos/          # Logo and branding
│       └── video/              # Video assets
├── scripts/                    # Build/utility scripts
│   └── convert-images.py       # Image conversion script
├── src/                        # Source code
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/           # Route groups
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Shared components
│   │   └── ui/                 # UI components (shadcn/ui)
│   ├── constants/              # App constants
│   ├── data/                   # Static data files
│   │   └── trips.json          # Trip data
│   ├── features/               # Feature-based modules
│   │   └── trips/              # Trip feature module
│   │       ├── components/     # Trip-specific components
│   │       ├── hooks/          # Trip-specific hooks
│   │       ├── types/          # Trip-specific types
│   │       ├── utils/          # Trip-specific utilities
│   │       └── index.ts        # Feature exports
│   ├── hooks/                  # Shared custom hooks
│   ├── lib/                    # Shared utilities/config
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utility functions
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── components.json             # shadcn/ui configuration
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration
```

## Key Improvements

### 1. Feature-Based Architecture

- Trip-related code is organized in `src/features/trips/`
- Each feature has its own components, hooks, types, and utilities
- Promotes separation of concerns and scalability

### 2. Asset Organization

- Images moved from `/public/images/` to `/public/assets/images/trips/`
- Better organization for different asset types
- Easier to manage and optimize

### 3. Data Layer Separation

- Trip data moved to `src/data/trips.json`
- Data access abstracted through utility functions
- Supports filtering, sorting, and pagination

### 4. Type Safety

- Comprehensive TypeScript types for all trip-related data
- Proper type exports and barrel exports
- Type-safe constants and utilities

### 5. Utility Functions

- Common utilities extracted to `src/utils/`
- Feature-specific utilities in feature folders
- Reusable functions for date formatting, sorting, etc.

### 6. Environment Configuration

- Proper environment variable setup
- Configuration separated from code
- Support for different environments

### 7. Script Organization

- Build and utility scripts moved to `/scripts/`
- Python image conversion tools properly organized
- Separation from main application code

## Benefits

1. **Maintainability**: Clear separation of concerns makes the code easier to maintain
2. **Scalability**: Feature-based architecture supports adding new features
3. **Type Safety**: Comprehensive TypeScript integration
4. **Performance**: Optimized asset organization and loading
5. **Developer Experience**: Better IDE support and code navigation
6. **Best Practices**: Follows Next.js 15 and React best practices

## Migration Notes

- Legacy imports are maintained for backward compatibility
- Gradual migration is supported through re-exports
- Image paths updated to use new asset structure
- Data access improved with utility functions
