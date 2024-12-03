/** @type {import('tailwindcss').Config} */
import DefaultTheme  from 'tailwindcss/defaultTheme'
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
    },
    screens:{
      'mobile':'375px',
      'desktop':'1440px',
      ...DefaultTheme.screens,
    }
  },
  plugins: [],
};
// const withMT = require("@material-tailwind/react/utils/withMT");
 
// module.exports = withMT({
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       backgroundImage: {},
//     },
//   },
//   plugins: [],
// });