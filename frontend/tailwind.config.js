/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        accent: "rgb(var(--color-accent))",

        background: "rgb(var(--color-background))",
        surface: "rgb(var(--color-surface))",
        border: "rgb(var(--color-border))",

        text: {
          primary: "rgb(var(--color-text-primary))",
          muted: "rgb(var(--color-text-muted))",
        },

        success: "rgb(var(--color-success))",
        warning: "rgb(var(--color-warning))",
        danger: "rgb(var(--color-danger))",
      },
    },
  },
  plugins: [],
};
