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
          green: "#2d6a4f",
          "green-light": "#40916c",
          "green-dark": "#1b4332",
          "green-pale": "#d8f3dc",
          yellow: "#d4e157",
          "yellow-dark": "#c6bb00",
          court: "#4a7c59",
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
