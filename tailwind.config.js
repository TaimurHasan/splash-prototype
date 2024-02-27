/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'splash-gray': '#1c1c1e',
        'splash-text-green': '#87E4B7',
        'splash-button-green': '#67FFB6',
      },
    },
  },
  plugins: [],
}

