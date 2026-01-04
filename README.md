# Trips - hungba.net

A personal travel log and trip diary built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📸 Photo gallery with optimized images
- 📍 Location mapping integration
- 🏷️ Trip tagging and filtering
- 📱 Responsive design
- 🌙 Dark/light mode support
- ⚡ Fast loading with image optimization
- 🔍 Search and filter functionality

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Image Optimization**: next-image-export-optimizer
- **Package Manager**: pnpm

## Project Structure

See [STRUCTURE.md](./STRUCTURE.md) for detailed project structure documentation.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hungdoba/trips.hungba.net.git
cd trips.hungba.net
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `dev` - Start development server with Turbopack
- `build` - Build for production with image optimization
- `start` - Start production server
- `lint` - Run ESLint

## Adding New Trips

Trip data is stored in `src/data/trips.json`. To add a new trip:

1. Add images to `public/images/trips/`
2. Add trip entry to `trips.json` with the following structure:

```json
{
  "id": 1,
  "date": "2024-01-15",
  "title": "Trip Title",
  "tag": "travel",
  "address": "Location Address",
  "mapUrl": "https://maps.google.com/...",
  "images": [
    {
      "src": "image.webp",
      "alt": "Image description",
      "caption": "Optional caption"
    }
  ],
  "videos": []
}
```

## Image Optimization

Use the Python script in `/scripts/convert-images.py` to convert images to WebP format:

```bash
cd scripts
python convert-images.py /path/to/images
```

## Deployment

The project is optimized for deployment on Vercel:

```bash
pnpm build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
