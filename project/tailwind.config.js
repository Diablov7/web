/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif']
      },
      colors: {
        'space-dark': '#030305',
        'space-light': '#08080F',
        'cosmic-purple': '#7000FF',
        'cosmic-lavender': '#9D4EDD',
        'cosmic-indigo': '#3C096C',
        'cosmic-teal': '#00FFE1',
        'cosmic-pink': '#FF2E93',
        'cosmic-yellow': '#FFD60A'
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(165deg, #030305, #08080F)',
        'purple-gradient': 'linear-gradient(135deg, #7000FF, #9D4EDD)',
        'teal-purple-gradient': 'linear-gradient(135deg, #00FFE1, #7000FF)',
        'pink-yellow-gradient': 'linear-gradient(135deg, #FF2E93, #FFD60A)',
        'space-pattern': 'radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.1) 0%, transparent 50%)'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        first: {
          "0%": { transform: "translateY(100%) scale(0.5)", opacity: 0.5 },
          "100%": { transform: "translateY(0%) scale(1)", opacity: 1 }
        },
        second: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(20%, 20%) scale(1.2)" },
          "100%": { transform: "translate(0%, 0%) scale(1)" }
        },
        third: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(-20%, 20%) scale(1.2)" },
          "100%": { transform: "translate(0%, 0%) scale(1)" }
        },
        fourth: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(20%, -20%) scale(1.2)" },
          "100%": { transform: "translate(0%, 0%) scale(1)" }
        },
        fifth: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(-20%, -20%) scale(1.2)" },
          "100%": { transform: "translate(0%, 0%) scale(1)" }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s linear infinite',
        first: "first 8s ease-in-out infinite",
        second: "second 8s ease-in-out infinite",
        third: "third 8s ease-in-out infinite",
        fourth: "fourth 8s ease-in-out infinite",
        fifth: "fifth 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};