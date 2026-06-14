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
          green: "#29B6F6",
          "green-light": "#039BE5",
          "green-dark": "#0288D1",
          "green-pale": "#E1F5FE",
          yellow: "#d4e157",
          "yellow-dark": "#c6bb00",
          court: "#2D2D2D",
          gray: "#2D2D2D",
          orange: "#29B6F6",
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
