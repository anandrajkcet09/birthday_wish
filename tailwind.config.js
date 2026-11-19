/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      colors: {
        romantic: {
          pink: {
            50: '#fff1f4',
            100: '#ffe4ea',
            200: '#fecdd8',
            300: '#fea3b7',
            400: '#fb7193',
            500: '#f43f71',
            600: '#e11d57',
          },
          lavender: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
          },
          cream: {
            50: '#fefdfb',
            100: '#fdfbf7',
            200: '#fbf7ee',
            300: '#f6eedb',
          },
          blush: '#ffd6e0',
          rose: '#ff8fa3',
          deepRose: '#c9184a',
        }
      },
      fontFamily: {
        romantic: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 25px rgba(244, 63, 113, 0.4), 0 0 50px rgba(192, 132, 252, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(254, 163, 183, 0.6))'
          },
          '50%': {
            boxShadow: '0 0 45px rgba(244, 63, 113, 0.7), 0 0 80px rgba(192, 132, 252, 0.5)',
            filter: 'drop-shadow(0 0 35px rgba(254, 163, 183, 0.9))'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
