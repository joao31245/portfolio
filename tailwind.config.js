/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f05454", // Vermelho suave
        background: "#121212", // Preto fosco
        card: "rgba(255, 255, 255, 0.1)", // Transparente
      },
    },
  },
  plugins: [],
};
