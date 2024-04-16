import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // "hero-bg": "url('/public/Hero-bg.jpg')",
      },
      colors: {
        "primary-brown": "#712D03",
        "secondary-brown": "#CF6E1B"
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
export default config;
