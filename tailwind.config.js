/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide')
  ]
}
