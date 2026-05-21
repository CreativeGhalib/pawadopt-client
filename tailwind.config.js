import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#006b5f',
        'primary-soft': '#14b8a6',
        secondary: '#fd761a',
        surface: '#f8f9ff',
        'surface-low': '#eff4ff',
        'surface-high': '#dce9ff',
        ink: '#0b1c30',
        muted: '#3c4947',
        outline: '#bbcac6',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 45px rgba(11, 28, 48, 0.08)',
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: '#006b5f', foreground: '#ffffff' },
            secondary: { DEFAULT: '#fd761a', foreground: '#ffffff' },
          },
        },
        dark: {
          colors: {
            primary: { DEFAULT: '#006b5f', foreground: '#ffffff' },
            secondary: { DEFAULT: '#fd761a', foreground: '#ffffff' },
          },
        },
      },
    }),
  ],
};
