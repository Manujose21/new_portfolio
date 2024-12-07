import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: {
        'primary': '#0e0e11',
        'secondary': '#230f2f',
        'tertiary': '#0f011f',
        'quaternary': '#4a3c73',
        'light': '#fff',
        'light-secondary': '#e5e5fa',
      },
      'color-text':{
        'primary': '#ffffff',
        'secondary': '#c5c5c5',
      },
      'revolver': {
        '50': '#f1e8ff',
        '100': '#e6d5ff',
        '200': '#d6b4ff',
        '300': '#c187ff',
        '400': '#b857ff',
        '500': '#ba31ff',
        '600': '#c40eff',
        '700': '#c205fd',
        '800': '#9a08cb',
        '900': '#77119e',
        '950': '#1c0424',
        "transparent": "transparent",
      },
    
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
