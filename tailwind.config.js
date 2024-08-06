const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using a class
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        moveBg: 'moveBg 5s ease infinite',
      },
      keyframes: {
        moveBg: {
          '0%': { 'background-position': '31% 0%' },
          '50%': { 'background-position': '70% 100%' },
          '100%': { 'background-position': '31% 0%' },
        },
      },
      clipPath: {
        button: 'polygon(0% 0.5em, 0.5em 0, 100% 0, 100% calc(100% - 0.5em), calc(100% - 0.5em) 100%, 0 100%)',
        'button-hover': 'polygon(calc(100% - 0.125em) calc(100% - 0.625em), calc(100% - 0.125em) 0.125em, calc(100% - 0.125em) 0.125em, calc(100% - 0.125em) calc(100% - 0.625em), calc(100% - 0.625em) calc(0.125em), calc(100% - 0.625em) calc(0.125em))',
      },
      colors: {
        'dark-bg': '#1a202c', // Custom dark background color
        'dark-grid': '#2d3748', // Custom dark grid color
      },
      fontSize: {
        medium: '1rem', // Customize this value as needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    addVariablesForColors,
    function ({ addUtilities, matchUtilities, theme }) {
      const newUtilities = {
        '.clip-path-button': {
          clipPath: 'polygon(0% 0.5em, 0.5em 0, 100% 0, 100% calc(100% - 0.5em), calc(100% - 0.5em) 100%, 0 100%)',
        },
        '.clip-path-button-hover': {
          clipPath: 'polygon(calc(100% - 0.125em) calc(100% - 0.625em), calc(100% - 0.125em) 0.125em, calc(100% - 0.125em) 0.125em, calc(100% - 0.125em) calc(100% - 0.625em), calc(100% - 0.625em) calc(0.125em), calc(100% - 0.625em) calc(0.125em))',
        },
      };
      addUtilities(newUtilities, ['hover', 'focus']);

      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
