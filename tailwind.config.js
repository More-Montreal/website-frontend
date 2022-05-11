module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
  theme: {
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      sans: ['Inter', 'sans-serif'],
      mono: ['monospace']
    },
    extend: {
      colors: {},
    },
  },
};