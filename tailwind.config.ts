import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 5px 10px 0px rgba(0, 0, 0, 0.1)",
      },
      borderWidth: {
        "5": "5px",
        "0.5": "0.5px",
      },
      colors: {
        primaryWhite: "#fff",
        secondaryWhite: "#f8fafc",
        customGreen: "#00B500",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        iconLeft: "40.11px",
        iconTop: "40.49px",
      },
    },
  },
  plugins: [],
} satisfies Config;
