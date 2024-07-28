/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        "orange": "#FF5403",
        "blue": "#011232",
        "seashell": "#fdf7f4",
        "creamy-white":"#EFDFCB",
        "background_clr":"#EBF1FA"
      },
      boxShadow: {
        'dual': '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        amatic: ['"Amatic SC"', 'sans-serif'],
        workSans: ['"Work Sans"', 'sans-serif'],
        sans: ["Quicksand", 'sans-serif']
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      fontSize: {
        heading1: '3.5rem', // Example: 64px
        heading2: '3rem', // Example: 48px
        heading3: '2.25rem', // Example: 36px
        heading4: '1.5rem', // Example: 24px
      }
    },
  },
  plugins: [],
}
