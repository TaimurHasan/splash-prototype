/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./(screens)/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'splash-gray': '#1c1c1e',
        'splash-green': '#87E4B7',
        'splash-greenbtn': '#67FFB6',
        'splash-redbtn': '#FF7967',
      },
    },
  },
  plugins: [],
}

