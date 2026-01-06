import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Deep Navy Foundation
        navy: {
          950: '#0a0e1a',
          900: '#0d1321',
          800: '#131b2e',
          700: '#1a2540',
          600: '#243252',
          500: '#334466',
        },
        // Accent - Warm Orange (Energy, Achievement)
        orange: {
          500: '#f97316',
          400: '#fb923c',
          300: '#fdba74',
          200: '#fed7aa',
        },
        // Cream - Warm whites
        cream: {
          100: '#fefcf9',
          200: '#fdf8f0',
          300: '#f5ebe0',
          400: '#e8dcc8',
        },
        // Semantic Colors
        teal: {
          500: '#14b8a6',
          400: '#2dd4bf',
          300: '#5eead4',
        },
        coral: {
          500: '#f43f5e',
          400: '#fb7185',
        },
        gold: {
          500: '#eab308',
          400: '#facc15',
          300: '#fde047',
        },
        // Legacy aliases for compatibility
        brand: {
          950: '#0a0e1a',
          900: '#0d1321',
          800: '#131b2e',
          700: '#1a2540',
          600: '#243252',
        },
        accent: {
          orange: '#fb923c',
          teal: '#2dd4bf',
          gold: '#facc15',
          coral: '#fb7185',
        },
        primary: {
          DEFAULT: '#fb923c',
          hover: '#f97316',
        },
        success: '#2dd4bf',
        danger: '#fb7185',
        warning: '#facc15',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-1': ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-2': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-3': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'glow-orange': '0 0 40px rgba(249, 115, 22, 0.3)',
        'glow-teal': '0 0 40px rgba(20, 184, 166, 0.3)',
        'glow-gold': '0 0 40px rgba(234, 179, 8, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-orange': 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
        'gradient-teal': 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
        'gradient-warm': 'linear-gradient(135deg, #fb923c 0%, #facc15 50%, #fdba74 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'slide-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-right': 'slideInRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 5s ease-in-out infinite',
        'glow': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'ticker': 'ticker-scroll 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.3), 0 0 60px rgba(249, 115, 22, 0.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
