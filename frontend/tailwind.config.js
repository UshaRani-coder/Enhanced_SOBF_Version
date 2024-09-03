/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#93c5fd",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        orange: "#FF5403",
        blue: "#2d335d",
        seashell: "#fdf7f4",
        "creamy-white": "#EFDFCB",
        background_clr: "#EBF1FA",
        "peacock-green": "#379e90 ",
        "peacock-green-hover": "#19675d",
        "light-lavender": "#edf1ffdb",
        "logo-blue": "#2C325C",
        logoYellow: "#EDB259",
      },
      boxShadow: {
        dual: "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1)",
        "neumorphic-light": "4px 4px 8px #d0d0d0, -8px -8px 15px #ffffff",
        "neumorphic-dark": "4px 4px 8px #a0a0a0, -4px -4px 8px #ffffff",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        amatic: ['"Amatic SC"', "sans-serif"],
        workSans: ['"Work Sans"', "sans-serif"],
        cursive: ["Are You Serious", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
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
        heading1: "3.5rem",
        heading2: "3rem",
        heading3: "2.25rem",
        heading4: "1.5rem",
        heading5: "1rem",
        headong6: "10px",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 80s linear infinite",
        "partners-infinite-scroll": "infinite-scroll 5s linear infinite",
        "infinite-scroll-reverse": "infinite-scroll-reverse 80s linear infinite",
        zoomIn: "zoomIn 2.5s forwards",
        scroll: "scroll 20s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "infinite-scroll-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.2)" },
        },
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".transition-bg-image": {
          transition: "background-image 0.5s ease-in-out",
        },
      });
    },
  ],
};
