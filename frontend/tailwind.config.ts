import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0B0B0B',
          700: '#1d1d1d',
          red: '#D90429',
          white: '#FFFFFF',
          surface: '#141414',
        },
      },
      boxShadow: {
        soft: '0 20px 70px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
