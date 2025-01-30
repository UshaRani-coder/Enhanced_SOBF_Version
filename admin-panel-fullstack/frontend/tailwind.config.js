/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'small-range': '375px',
        'small-max': '425px',
      },
    },
    scrollbar: {
      none: {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }), // Ensure compatibility
  ],
  variants: {
    scrollbar: ['rounded'], // Add 'rounded' scrollbar support
  },
};
