import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0D1B2A",
        "navy-mid": "#162234",
        "navy-light": "#1E3045",
        gold: "#C9A84C",
        "gold-light": "#E2C576",
        "gold-pale": "#F7EDD0",
        "off-white": "#F5F4F1",
        muted: "#8A97A8",
        green: "#2E7D5B",
        "green-light": "#E6F4EE",
        red: "#C0392B",
        "red-light": "#FDECEA",
        border: "rgba(201,168,76,0.18)",
      },
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
      borderRadius: {
        DEFAULT: "14px",
        sm: "8px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(13,27,42,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
