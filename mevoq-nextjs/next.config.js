/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image Optimization for Pharmaceutical Imagery
    // Using AVIF for best compression given the high-res nature of medical assets
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vjllbclvywghrhlcpapa.supabase.co', // Allow Supabase Storage
            },
            {
                protocol: 'https',
                hostname: 'placehold.co', // Allow placeholders
            }
        ],
        // Cache for 24 hours (86400 seconds)
        minimumCacheTTL: 86400,
    },

    // Security Headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY', // Prevent clickjacking
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff', // Prevent MIME sniffing
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin', // Privacy
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload', // Force HTTPS
                    }
                ],
            },
        ];
    },

    // Redirects for future domain transition
    async redirects() {
        return [
            // Uncomment when transitioning to mevoq.com
            // {
            //     source: '/:path*',
            //     has: [{ type: 'host', value: 'maglinc.vercel.app' }],
            //     destination: 'https://mevoq.com/:path*',
            //     permanent: true,
            // },
        ];
    },

    // Build Optimizations
    productionBrowserSourceMaps: false, // Disable for faster builds and security

    // Experimental Features for Performance
    experimental: {
        // optimizePackageImports included by default for many libs in Next.js 15
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'date-fns'],
    },
};

module.exports = nextConfig;
