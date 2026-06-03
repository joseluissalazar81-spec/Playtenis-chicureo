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
        tennis: {
          green: "#E8450A",
          "green-light": "#f05a1e",
          "green-dark": "#b33408",
          "green-pale": "#fde8e0",
          yellow: "#d4e157",
          "yellow-dark": "#c6bb00",
          court: "#2D2D2D",
          gray: "#2D2D2D",
          orange: "#E8450A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
