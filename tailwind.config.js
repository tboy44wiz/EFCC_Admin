/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "AppLogo": "url('./efcc_logo.png')"
      }),
      colors: {
        "lighterRed": "#FECACA",
        "lightRed": "#F87171",
        "darkRed": "#991B1B",
      },
      animation: {
        "bounceShort": "bounce 1s ease-in-out 3.5"
      }
    },
    fontFamily: {
      "Doris": ["Dosis", "sans-serif"],
      OpenSan: ["Open Sans", 'sans-serif']
    }
  },
  plugins: [],
}

