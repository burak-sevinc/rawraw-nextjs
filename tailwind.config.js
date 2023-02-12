/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    textColor: {
      first: "var(--color-first)",
      second: "var(--color-second)",
      third: "var(--color-third)",
      fourth: "var(--color-fourth)",
      ...colors,
    },
    backgroundColor: {
      first: "var(--color-first)",
      second: "var(--color-second)",
      third: "var(--color-third)",
      fourth: "var(--color-fourth)",
      fifth: "var(--color-fifth)",
      main: "var(--color-main)",
      ...colors,
    },
    borderColor: {
      first: "var(--color-first)",
      second: "var(--color-second)",
      third: "var(--color-third)",
      fourth: "var(--color-fourth)",
      ...colors,
    },
    boxShadowColor: {
      first: "var(--color-first)",
      second: "var(--color-second)",
      third: "var(--color-third)",
      fourth: "var(--color-fourth)",
      ...colors,
    },
    divideColor: {
      first: "var(--color-first)",
      second: "var(--color-second)",
      third: "var(--color-third)",
      fourth: "var(--color-fourth)",
      ...colors,
    },
    ringColor:{
      first: "var(--color-first)",
      second: "var(--color-second)",
      third: "var(--color-third)",
      fourth: "var(--color-fourth)",
      ...colors,
    },
    extend: {
      colors:{
        "thumb-color": "var(--color-third)",
        "track-color": "var(--color-fourth)",
      }
      // colors: {
      //   "dark": "#181818",
      //   "dark-green": "#1E5128",
      //   "light-green": "#4E9F3D",
      //   "lemon-green": "#D8E9A8",
      //   "navbar-dark": "#161616",
      //   "navbar-border": "#3B5249",
      //   "lemon-haze": "#FFE77AFF",
      // },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
