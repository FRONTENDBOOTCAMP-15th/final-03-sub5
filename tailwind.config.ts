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
        primary: "#000080",
        "primary-light": "#004d7a",
        "primary-dark": "#002340",
        secondary: "var(--color-secondary)",
        "gray-custom": "#c3c3c3",
        notselectbtn: "#F4F4F4",
        "notselectbtn-border": "#686868",
        "sub-title": "#6B7280",
        error: "#E85C5C",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
