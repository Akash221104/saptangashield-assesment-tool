import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#080B0A",
          secondary: "#101512",
          card: "#141A16",
          cardHover: "#1B221E",
        },
        gold: {
          primary: "#C8A96B",
          bright: "#E3C77F",
          dark: "#9E8148",
          glow: "rgba(200, 169, 107, 0.15)",
        },
        ancient: {
          green: "#9CAF84",
          greenMuted: "rgba(156, 175, 132, 0.2)",
          border: "rgba(200, 169, 107, 0.2)",
          borderGlow: "rgba(227, 199, 127, 0.4)",
        },
        text: {
          main: "#E9DFC9",
          muted: "#9A9C91",
          bright: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "Geist", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C8A96B 0%, #E3C77F 50%, #9E8148 100%)",
        "radial-mandala": "radial-gradient(circle at center, rgba(200, 169, 107, 0.12) 0%, rgba(8, 11, 10, 0.95) 70%)",
        "grid-pattern": "linear-gradient(to right, rgba(200, 169, 107, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(200, 169, 107, 0.04) 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 90s linear infinite",
        "spin-reverse-slow": "spin-reverse 120s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.02)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
