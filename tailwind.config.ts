import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06010f",
          900: "#0a0118",
          800: "#120627",
          700: "#1a0a2e",
          600: "#241245",
        },
        mist: {
          lavender: "#d6bcfa",
          rose: "#f3d9f5",
          mint: "#b8e8d2",
          sky: "#c7d8ff",
        },
        moon: {
          silver: "#d6d3e3",
          gold: "#f5e6c8",
          pearl: "#f8f5ff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        drift: "drift 30s ease-in-out infinite",
        "drift-slow": "drift 45s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(8%, -6%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-6%, 4%, 0) scale(0.95)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(214,188,250,0.3), 0 0 40px rgba(243,217,245,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(214,188,250,0.55), 0 0 80px rgba(243,217,245,0.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
