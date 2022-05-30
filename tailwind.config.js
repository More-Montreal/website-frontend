module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
  safelist: [
    'bg-gray-50', 'bg-red-50', 'bg-blue-50', 'bg-indigo-50', 'bg-green-50',
    'text-gray-900', 'text-red-900', 'text-blue-900', 'text-indigo-900', 'text-green-900',
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