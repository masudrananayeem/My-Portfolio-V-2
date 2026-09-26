/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@nayeem/config/tailwind-preset.js")],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};
