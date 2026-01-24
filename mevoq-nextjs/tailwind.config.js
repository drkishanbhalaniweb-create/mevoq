// Tailwind CSS Configuration

module.exports = {
    darkMode: ["class"],
    // Optimize for JIT compilation by targeting specific paths
    content: [
        "./app/**/*.{js,jsx,mdx}",        // App Router
        "./components/**/*.{js,jsx,mdx}", // UI Components
        "./lib/**/*.{js,jsx}"             // Utils/Config
    ],
    theme: {
        extend: {
            // PROMPT: Global Color System Reboot (Clinical/High-Contrast)
            colors: {
                // Backgrounds
                white: '#F8FAFC', // Slate 50 (Clinical Off-White)
                pure: '#FFFFFF',  // Absolute White

                // Primary Colors
                primary: {
                    DEFAULT: '#020617', // Slate 950 (Ink)
                    dark: '#000000',
                    darker: '#020617',
                    light: '#E2E8F0',
                    navy: '#000000',    // Pure Ink (Hero Text Authority)
                    blue: '#0F172A',    // Midnight Navy (Professional CTA)
                    teal: '#0D9488',    // Signal Teal (Darker/Sharper)
                },
                // Accent Colors
                accent: {
                    DEFAULT: '#0D9488', // Teal 600
                    dark: '#0F766E',
                    light: '#CCFBF1',
                },
                // Semantic Colors
                success: {
                    DEFAULT: '#059669', // Emerald 600
                    green: '#059669',
                },
                warning: {
                    DEFAULT: '#D97706', // Amber 600
                },
                error: {
                    DEFAULT: '#DC2626', // Red 600
                },
                // Gray Scale (Slate - Cool/Clinical)
                gray: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B', // Body Text (Soft Gray)
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                },
                // Shadcn/ui & Radix Colors
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
            },
            // Border Radius
            borderRadius: {
                lg: '8px',
                md: '6px',
                sm: '4px',
                xl: '12px',
                '2xl': '16px',
                // Shadcn defaults
                'sh-lg': 'var(--radius)',
                'sh-md': 'calc(var(--radius) - 2px)',
                'sh-sm': 'calc(var(--radius) - 4px)',
            },
            // Box Shadow
            boxShadow: {
                'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'primary': '0 4px 14px rgba(2, 6, 23, 0.25)', // Ink Shadow
                'accent': '0 4px 14px rgba(13, 148, 136, 0.25)', // Teal Shadow
            },
            // Font Family: Preserves Inter font setup
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-source-serif)', 'serif'],
            },
            // Container
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '1.5rem',
                    lg: '2rem',
                },
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1200px',
                },
            },
            // Animations: Includes existing Radix UI animations
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-in-up': {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'slide-in-left': {
                    from: { opacity: '0', transform: 'translateX(-30px)' },
                    to: { opacity: '1', transform: 'translateX(0)' }
                },
                'slide-in-right': {
                    from: { opacity: '0', transform: 'translateX(30px)' },
                    to: { opacity: '1', transform: 'translateX(0)' }
                },
                'scale-in': {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
                'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
                'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
                'scale-in': 'scale-in 0.5s ease-out forwards',
                'shimmer': 'shimmer 1.5s ease-in-out infinite',
                'spin-slow': 'spin 60s linear infinite',
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};
