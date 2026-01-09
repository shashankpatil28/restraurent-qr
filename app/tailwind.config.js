/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#2D1B14",  // Deep chocolate
          gold: "#D4A373",  // Warm accent
          soft: "#FAEDCD",  // Cream background
        },
      },
      boxShadow: {
        'depth': '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}