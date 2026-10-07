/** Shared design system — theme-aware for web + admin. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          black: "rgb(var(--base-black) / <alpha-value>)",
          near: "rgb(var(--base-near) / <alpha-value>)",
          charcoal: "rgb(var(--base-charcoal) / <alpha-value>)",
          panel: "rgb(var(--base-panel) / <alpha-value>)",
          border: "rgb(var(--base-border) / <alpha-value>)",
        },
        accent: {
          cyan: "rgb(var(--accent-primary) / <alpha-value>)",
          blue: "rgb(var(--accent-blue) / <alpha-value>)",
          purple: "rgb(var(--accent-secondary) / <alpha-value>)",
          green: "rgb(var(--accent-success) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--foreground) / <alpha-value>)",
          muted: "rgb(var(--foreground-muted) / <alpha-value>)",
          faint: "rgb(var(--foreground-faint) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        tech: ["Orbitron", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgb(var(--grid-line) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid-line) / 0.06) 1px, transparent 1px)",
        "glow-radial":
          "radial-gradient(circle at 50% 0%, rgb(var(--accent-primary) / 0.16), transparent 60%)",
      },
      backgroundSize: { grid: "40px 40px" },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "marquee-reverse": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        "pulse-glow": { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.5 } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        scan: "scan 3s linear infinite",
      },
    },
  },
  plugins: [],
};
