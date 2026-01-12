/** @type {import('tailwindcss').Config} */
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
            // PROMPT: Matches existing color scheme: primary blue #0052CC, navy backgrounds
            colors: {
                // Primary Colors (Matches frontend/tailwind.config.js)
                primary: {
                    DEFAULT: '#0052CC',
                    dark: '#003BA3',
                    darker: '#00274D',
                    light: '#E3F2FD',
                    navy: '#001F3F', // Navy Background
                    blue: '#0052CC',
                    teal: '#1DD1A1',
                },
                // Accent Colors
                accent: {
                    DEFAULT: '#1DD1A1',
                    dark: '#0FA361',
                    light: '#E8FDF5',
                },
                // Semantic Colors
                success: {
                    DEFAULT: '#4CAF50',
                    green: '#4CAF50',
                },
                warning: {
                    DEFAULT: '#FF9800',
                },
                error: {
                    DEFAULT: '#F44336',
                },
                // Gray Scale
                gray: {
                    50: '#F9FAFB',
                    100: '#F5F5F5',
                    200: '#EBEBEB',
                    300: '#CCCCCC',
                    400: '#999999',
                    500: '#666666',
                    600: '#4B5563',
                    700: '#333333',
                    800: '#1A1A1A',
                    900: '#111827',
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
                'sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
                'md': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'lg': '0 4px 12px rgba(0, 0, 0, 0.15)',
                'xl': '0 8px 24px rgba(0, 0, 0, 0.12)',
                '2xl': '0 12px 32px rgba(0, 0, 0, 0.16)',
                'primary': '0 4px 14px rgba(0, 82, 204, 0.25)',
                'accent': '0 4px 14px rgba(29, 209, 161, 0.25)',
            },
            // Font Family: Preserves Inter font setup
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};
