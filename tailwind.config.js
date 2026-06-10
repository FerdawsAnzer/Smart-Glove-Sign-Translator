/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },

      keyframes: {
        loadBar: {
          "0%": { width: "0%" },
          "30%": { width: "40%" },
          "70%": { width: "75%" },
          "100%": { width: "100%" },
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        loadBar: "loadBar 2.2s ease-in-out forwards",
        fadeUp: "fadeUp 0.6s ease both",
      },
    },
  },
  plugins: [],
};