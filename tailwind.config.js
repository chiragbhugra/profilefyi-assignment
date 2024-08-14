/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4B9CD3",
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
        },
        secondary: {
          light: "#9CA3AF",
          DEFAULT: "#6B7280",
          dark: "#4B5563",
        },
        accent: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};