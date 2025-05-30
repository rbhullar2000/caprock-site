import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caprock Capital Group | Auto Financing',
  description: 'Fast and trusted vehicle financing solutions with Caprock Capital Group. Get pre-approved today!',
  keywords: [
    'Auto Financing',
    'Car Loans',
    'Vehicle Pre-Approval',
    'Caprock Capital Group',
    'Canada Car Financing',
  ],
  authors: [{ name: 'Caprock Capital Group', url: 'https://www.caprockcapital.ca' }],
  creator: 'Caprock Capital Group',
  publisher: 'Caprock Capital Group',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Caprock Capital Group | Auto Financing',
    description: 'Fast and trusted vehicle financing solutions with Caprock Capital Group. Get pre-approved today!',
    url: 'https://www.caprockcapital.ca',
    siteName: 'Caprock Capital Group',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Caprock Capital Group Logo',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caprock Capital Group | Auto Financing',
    description: 'Get fast and trusted vehicle financing solutions with Caprock Capital Group. Pre-approval made easy.',
    images: ['/logo.png'],
    creator: '@YourTwitterHandle',
  },
  metadataBase: new URL('https://www.caprockcapital.ca'),
  other: {
    'link:preload': '<link rel="preload" as="image" href="/logo.png" />',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
