/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        collage: "url('./assets/Collage Artist Wallpaper.jpg')",
      },
    },
  },
  plugins: [],
};
