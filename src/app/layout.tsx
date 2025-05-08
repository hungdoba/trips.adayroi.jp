import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Trips - Adayroi',
  description: 'Nơi lưu giữ các chuyến đi của tôi',
  metadataBase: new URL('https://trips.adayroi.jp'),
  openGraph: {
    title: 'Trips - Adayroi',
    description: 'Nơi lưu giữ các chuyến đi của tôi',
    url: 'https://trips.adayroi.jp',
    siteName: 'Trips - Adayroi',
    images: [
      {
        url: 'https://trips.adayroi.jp/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Trips - Adayroi',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    googleBot: 'index, follow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trips - Adayroi',
    description: 'Nơi lưu giữ các chuyến đi của tôi',
    images: 'https://trips.adayroi.jp/images/logo.png',
    creator: '@adayroi',
    site: '@adayroi',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
  appleWebApp: {
    title: 'Trips - Adayroi',
    statusBarStyle: 'default',
    capable: true,
    startupImage: [
      {
        url: '/images/logo.png',
        media: '(device-width: 375px) and (device-height: 812px)',
      },
    ],
  },
  alternates: {
    canonical: 'https://trips.adayroi.jp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="md:container mx-auto w-full md:max-w-6xl">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
