import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "#6366f1", // Indigo 500
          hover: "#4f46e5",   // Indigo 600
        },
        secondary: {
          DEFAULT: "#ec4899", // Pink 500
          hover: "#db2777",   // Pink 600
        },

        /* Flat surface colors (important) */
        "surface-light": "#ffffff",
        "surface-dark": "#0f172a",
        "surface-glass": "rgba(255, 255, 255, 0.8)",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
