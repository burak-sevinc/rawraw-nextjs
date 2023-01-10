/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark": "#181818",
        "dark-green": "#1E5128",
        "light-green": "#4E9F3D",
        "lemon-green": "#D8E9A8",
        "navbar-dark": "#161616",
        "navbar-border": "#3B5249",
        "lemon-haze": "#FFE77AFF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
