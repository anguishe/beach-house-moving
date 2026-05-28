import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1B2B4B",
          coral: "#E85D3D",
          "coral-dark": "#C94828",
          sand: "#F5F0E8",
          teal: "#2A9D8F",
          gold: "#E9C46A",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "12px",
        "brand-lg": "20px",
      },
      boxShadow: {
        brand: "0 4px 24px rgba(27, 43, 75, 0.08)",
        "brand-lg": "0 8px 40px rgba(27, 43, 75, 0.12)",
        "brand-hover": "0 12px 48px rgba(27, 43, 75, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
