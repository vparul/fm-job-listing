/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        cyan: {
          100: "hsl(180, 52%, 96%)",
          300: " hsl(180, 31%, 95%)",
          500: "hsl(179, 29%, 51%)",
          700: "hsl(180, 8%, 52%)",
          900: "hsl(180, 14%, 20%)",
        },
        ...defaultTheme.colors,
      },
    },
  },
  plugins: [],
};
