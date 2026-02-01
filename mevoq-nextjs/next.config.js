/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable compression
    compress: true,

    // Image Optimization for Pharmaceutical Imagery
    // Using AVIF for best compression given the high-res nature of medical assets
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'scnomhsoweqblursbeul.supabase.co', // Current Supabase Storage
            },
            {
                protocol: 'https',
                hostname: 'vjllbclvywghrhlcpapa.supabase.co', // Legacy/Alternative Supabase Storage
            },
            {
                protocol: 'https',
                hostname: 'placehold.co', // Allow placeholders
            }
        ],
        // Cache for 24 hours (86400 seconds)
        minimumCacheTTL: 86400,
        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        // Image sizes for different layouts
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

    // Webpack optimizations
    /*
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Optimize client-side bundle splitting
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // Group common dependencies
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2,
                    },
                    // Separate large libraries
                    lib: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )?.[1];
                            return `npm.${packageName?.replace('@', '')}`;
                        },
                        priority: 10,
                    },
                },
            };
        }
        return config;
    },
    */
};

module.exports = nextConfig;
