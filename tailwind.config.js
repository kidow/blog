/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-up': {
          from: {
            opacity: 0,
            transform: 'translate3d(0, -16px, 0)'
          },
          '60%': {
            opacity: 1
          },
          to: {
            transform: 'none'
          }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.2s linear'
      }
    }
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide')
  ]
}
