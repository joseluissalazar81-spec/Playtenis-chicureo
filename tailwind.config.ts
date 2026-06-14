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
          green: "#C1440E",
          "green-light": "#A33A08",
          "green-dark": "#8B2E05",
          "green-pale": "#FBE9E0",
          yellow: "#d4e157",
          "yellow-dark": "#c6bb00",
          court: "#1B5E20",
          gray: "#1B5E20",
          orange: "#C1440E",
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
