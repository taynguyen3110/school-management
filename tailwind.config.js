/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        background: '#F5F7FA',
        primary: {
          300: '#509CDB',
          500: '#2671B1'
        },
        bgheader: '#D60A0B',
        bgbody: '#14238A',
        bgchildbody: '#263AC3',
      }
    },
  },
  plugins: [],
}

