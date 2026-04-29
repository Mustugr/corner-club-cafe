/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfaf5",
          100: "#f9f1e3",
          200: "#f0e2c8",
        },
        coffee: {
          50: "#f8f3ee",
          100: "#e9dccd",
          200: "#cdb091",
          300: "#a6815c",
          400: "#7c5a3a",
          500: "#5a3e26",
          600: "#42291a",
          700: "#2c1a10",
          800: "#1a0f08",
        },
        accent: {
          DEFAULT: "#c9963f",
          dark: "#a47a2b",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(42, 25, 16, 0.18)",
        card: "0 4px 20px -8px rgba(42, 25, 16, 0.15)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(26,15,8,0.85) 0%, rgba(66,41,26,0.65) 100%)",
      },
    },
  },
  plugins: [],
};
