/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121214',
        'background-overlay': 'rgba(18,18,20, 0.85)',
        'background-card': 'rgba(18,18,20, 0.64)',
        primary: {
          DEFAULT: '#7E5BEF',
          light: '#9B7EF2',
          dark: '#6B4EE6',
          glow: 'rgba(126, 91, 239, 0.60)'
        },
        secondary: {
          DEFAULT: '#00D1FF',
          light: '#33DAFF',
          dark: '#00B8E6',
          glow: 'rgba(0, 209, 255, 0.60)'
        },
        accent: {
          magenta: '#FF4ECD',
          purple: '#7E5BEF',
          teal: '#00D1FF'
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255, 0.65)',
          tertiary: 'rgba(255,255,255, 0.40)'
        },
        border: {
          DEFAULT: 'rgba(255,255,255, 0.08)',
          light: 'rgba(255,255,255, 0.12)',
          dark: 'rgba(255,255,255, 0.04)'
        },
        live: '#00D1FF',
        unread: '#FF4ECD'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7E5BEF 0%, #00D1FF 100%)',
        'gradient-secondary': 'linear-gradient(90deg, #FF4ECD 0%, #7E5BEF 100%)',
        'gradient-sol': 'linear-gradient(135deg, #7E5BEF 0%, #00D1FF 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(126, 91, 239, 0.1) 0%, rgba(0, 209, 255, 0.05) 100%)',
        'gradient-badge': 'linear-gradient(90deg, #FF4ECD 0%, #7E5BEF 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
      },
      boxShadow: {
        'elevation': '0px 4px 16px rgba(0, 0, 0, 0.20)',
        'glow-primary': '0 0 8px rgba(126, 91, 239, 0.60)',
        'glow-secondary': '0 0 8px rgba(0, 209, 255, 0.60)',
        'glow-magenta': '0 0 8px rgba(255, 78, 205, 0.60)'
      },
      backdropBlur: {
        'card': '16px'
      }
    },
  },
  plugins: [],
};