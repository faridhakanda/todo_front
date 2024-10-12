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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'sm': {'min': '300px', 'max': '550px'},
        'md': {'min': '501px', 'max': '750px'},
        'lg': {'min': '751px', 'max': '1050px'},
        'xl': {'min': '1051px', 'max': '1250px'},
        '2xl': {'min': '1251px', 'max': '2500px'},
      }
    },
  },
  plugins: [],
};
export default config;
