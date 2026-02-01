import './globals.css';
import { Inter, Source_Serif_4 } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

export const metadata = {
  metadataBase: new URL('https://mevoq.life'),
  title: {
    default: 'Mevoq | Pharmaceutical Regulatory Consulting',
    template: '%s | Mevoq'
  },
  description: 'Mevoq partners with pharmaceutical teams to execute regulatory strategies across FDA, EMA, and global authorities. Expertise in CMC, clinical trials, and drug approvals.',
  keywords: ['pharmaceutical consulting', 'regulatory affairs', 'FDA approval', 'EMA submissions', 'drug development strategy', 'CMC consulting'],
  authors: [{ name: 'Mevoq Team' }],
  creator: 'Mevoq',
  publisher: 'Mevoq',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mevoq.life',
    siteName: 'Mevoq',
    title: 'Mevoq | Pharmaceutical Regulatory Consulting',
    description: 'Expert regulatory strategy and execution for global drug approvals.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mevoq Regulatory Success',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mevoq | Pharmaceutical Regulatory Consulting',
    description: 'Expert regulatory strategy and execution for global drug approvals.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

import SchemaMarkup from './components/SchemaMarkup';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>
        <SchemaMarkup />
        {children}
      </body>
    </html>
  );
}
