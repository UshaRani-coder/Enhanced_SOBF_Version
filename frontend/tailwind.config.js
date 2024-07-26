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
        "orange": "#FF7700",
        "blue":"#101840"
      },
      boxShadow: {
        'dual': '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1)', 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        amatic : ['"Amatic SC"', 'sans-serif'],
        workSans: ['"Work Sans"', 'sans-serif'],
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
    },
  },
  plugins: [],
}