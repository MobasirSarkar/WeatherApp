/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "Bg-Img": "url('../src/images/BgImg.jpg')",
        yellowSky: "url('../src/images/yellowSky.jpg')",
        clearSky: "url('../src/images/clearSky.jpg')",
        orangeSky: "url('../src/images/orangeSky.jpg')",
        clearSkyV22: "url('../src/images/clearSky22.jpg')",
      },
      screens: {
        fold: "280px",
        xs: "412px",
      },
      fontSize: {
        "10xl": "160px",
      },
    },
  },
  plugins: [],
};
