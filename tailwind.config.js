/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── shadcn/ui tokens (via CSS vars) ──
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ── Digital Atelier palette ──
        "atelier-bg":           "#131313",
        "atelier-surface":      "#201f1f",
        "atelier-surface-low":  "#1c1b1b",
        "atelier-surface-high": "#2a2a2a",
        "atelier-surface-highest": "#353534",
        "atelier-surface-bright": "#393939",
        "atelier-primary":      "#5dd7e6",
        "atelier-primary-dim":  "#5dd7e6",
        "atelier-primary-fixed":"#8df2ff",
        "atelier-primary-cont": "#005f68",
        "atelier-on-primary":   "#00363c",
        "atelier-secondary":    "#b0cbd1",
        "atelier-secondary-cont":"#324b50",
        "atelier-on-surface":   "#e5e2e1",
        "atelier-on-surface-var":"#bec8ca",
        "atelier-outline":      "#899295",
        "atelier-outline-var":  "#3f484a",
        "atelier-tertiary":     "#ffb783",
        "atelier-tertiary-cont":"#7d491f",
        "atelier-error":        "#ffb4ab",
        "atelier-error-cont":   "#93000a",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

