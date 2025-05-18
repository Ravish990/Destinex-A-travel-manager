/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '600': '600ms',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '1000': '1000',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["dark", "light"], // Enable dark and light themes
    darkTheme: "dark", // Set dark theme as default or use data-theme attribute
    styled: true,
    base: true,
    utils: true,
    logs: true,
    prefix: "",
    themeRoot: ":root",
  },
} 