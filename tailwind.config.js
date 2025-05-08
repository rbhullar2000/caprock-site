/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",          // for App Router structure
    "./pages/**/*.{js,ts,jsx,tsx}",        // in case you're using Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",   // for your components
    "./src/**/*.{js,ts,jsx,tsx}",          // optional if you store files in src/
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0a0e2c',   // your custom navy background
        secondary: '#1e3a8a', // example blue (optional)
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // makes form elements cleaner and consistent
  ],
}
