import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vinho: "#4A0E17",
        "vinho-escuro": "#24050B",
        lacre: "#6E1220",
        ouro: "#C9A45C",
        "ouro-escuro": "#8A6A32",
        champanhe: "#E8D5A8",
        marfim: "#F4EDDE",
        tinta: "#2A161A",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        pinyon: ["var(--font-pinyon)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
