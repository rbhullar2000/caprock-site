/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',          // App Router (used in Next.js 13+)
    './pages/**/*.{js,ts,jsx,tsx}',        // Pages directory support
    './components/**/*.{js,ts,jsx,tsx}',   // Component scanning
    './src/**/*.{js,ts,jsx,tsx}',          // Optional: src directory support
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0a0e2c',
        secondary: '#1e3a8a',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
