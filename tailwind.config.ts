import type { Config } from "tailwindcss";

export default {
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
      fontFamily: {
        sans: ['"Ubuntu Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans',
          'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
