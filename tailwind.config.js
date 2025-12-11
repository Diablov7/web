/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#3b82f6',
        accent: '#8b5cf6',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
      },
      wordBreak: {
        'break-word': 'break-word',
      },
      overflowWrap: {
        'anywhere': 'anywhere',
      },
    },
  },
  plugins: [],
}
