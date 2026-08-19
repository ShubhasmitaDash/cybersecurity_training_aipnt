/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#060d1b',
          dark: '#0b1426',
          surface: '#111e38',
          card: '#162544',
          border: '#203358',
          subtle: '#334b77',
          text: '#f1f5f9',
          muted: '#94a3b8',
        },
        brand: {
          blue: '#002B7F',
          royal: '#003eb3',
          light: '#2563eb',
          cyan: '#06b6d4',
          gold: '#d97706',
          goldLight: '#fbbf24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.4)',
        'glow-gold': '0 0 20px -5px rgba(217, 119, 6, 0.4)',
        'glow-red': '0 0 20px -5px rgba(239, 68, 68, 0.4)',
        'glow-green': '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        wave: {
          '0%': { height: '8px' },
          '100%': { height: '36px' },
        }
      }
    },
  },
  plugins: [],
}
