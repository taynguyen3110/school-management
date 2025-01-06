/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontSize: {
        title: ["20px",
          {
            fontWeight: "600"
          }
        ],
      },
      colors: {
        background: "#F5F7FA",
        primary: {
          300: "#509CDB",
          500: "#2671B1",
        },
        bgheader: "#D60A0B",
        bgbody: "#14238A",
        bgchildbody: "#263AC3",
        primary2: "#343C6A",
        primary3: "#2D60FF",
        sidebar: "#B1B1B1",
        thead: "#718EBF",
        tbody: "#232323",
        inputTitle: '#7D8592',
      },
    },
  },
  plugins: [],
};
