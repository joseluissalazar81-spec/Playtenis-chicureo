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
          green: "#CC5500",
          "green-light": "#B34A00",
          "green-dark": "#993D00",
          "green-pale": "#FBE9E0",
          yellow: "#d4e157",
          "yellow-dark": "#c6bb00",
          court: "#2D2D2D",
          gray: "#2D2D2D",
          orange: "#CC5500",
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
