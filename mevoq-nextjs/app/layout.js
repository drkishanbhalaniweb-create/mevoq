import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

// Performance: Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  adjustFontFallback: true, // Prevents layout shift
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maglinc.vercel.app';

// Enterprise SEO Configuration
export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Mevoq | Pharmaceutical Consulting - Accelerate Your Drug Approvals',
    template: '%s | Mevoq Pharmaceutical Consulting',
  },

  description: 'Expert pharmaceutical regulatory consulting. FDA, EMA, Health Canada approval strategies. IND/NDA/BLA submissions. 50+ successful drug approvals, 25 years experience.',

  keywords: [
    'pharmaceutical consulting',
    'FDA approval',
    'regulatory affairs',
    'drug development',
    'clinical trials',
    'IND',
    'NDA',
    'BLA',
    'regulatory strategy',
    'GMP compliance'
  ],

  // B2B focused OpenGraph for LinkedIn
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Mevoq Pharmaceutical Consulting',
    title: 'Mevoq | Pharmaceutical Consulting - Accelerate Your Drug Approvals',
    description: 'Expert pharmaceutical regulatory consulting. FDA, EMA, Health Canada approval strategies. IND/NDA/BLA submissions.',
    images: [
      {
        url: '/og-image.jpg', // Ensure this exists in public/
        width: 1200,
        height: 630,
        alt: 'Mevoq Pharmaceutical Consulting - Regulatory Strategy',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Mevoq | Pharmaceutical Consulting',
    description: 'Accelerate your regulatory approvals with expert guidance.',
    creator: '@mevoq_pharma', // Placeholder handle
  },

  // Crawler Directives
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

  // Favicon & Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Verification for Search Console (placeholder)
  verification: {
    google: 'verification_token',
  },
};

// Structured Data: Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mevoq Pharmaceutical Consulting',
  description: 'Pharmaceutical regulatory consulting and drug approval acceleration',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  areaServed: ['US', 'CA', 'EU'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    email: 'contact@mevoq.com'
  },
  serviceType: [
    'Regulatory Strategy',
    'FDA Consulting',
    'Clinical Trial Consulting',
    'Quality Systems',
    'Medical Writing'
  ],
  priceRange: '$$$$'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>

      {/* 
        Tailwind classes:
        - min-h-screen: Ensures footer pushes to bottom
        - antialiased: Crisper text rendering
        - bg-white: Clean background
      */}
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white text-gray-900">

        {/* Navigation - Client Component */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer - Static Server Component */}
        <Footer />

        {/* PostHog Analytics - Lazy Loaded Client Component */}
        {/* <PostHogProvider /> -- To be implemented later */}
      </body>
    </html>
  );
}
