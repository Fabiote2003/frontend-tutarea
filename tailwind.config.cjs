/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'fondo': "#22333B"
      },
    },
    fontFamily: {
      'mont': ["Montserrat"],
      'inter': ["Inter"],
      'open': ["Open Sans"]
    }
  },
  plugins: [],
}