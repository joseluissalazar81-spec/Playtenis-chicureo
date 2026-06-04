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
          green: "#1565C0",
          "green-light": "#1976D2",
          "green-dark": "#0D47A1",
          "green-pale": "#E3F2FD",
          yellow: "#d4e157",
          "yellow-dark": "#c6bb00",
          court: "#2D2D2D",
          gray: "#2D2D2D",
          orange: "#1565C0",
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
