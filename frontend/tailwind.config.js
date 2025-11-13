export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "monospace"]
      },
      colors: {
        luna: {
          bg: "#0b0e11",
          surface: "#121417",
          border: "#1f2229",
          text: "#e8eaed",
          muted: "#9aa0a6",
          accent: "#7f5af0"
        }
      },
      boxShadow: {
        soft: "0 0 20px rgba(127, 90, 240, 0.08)"
      }
    }
  },
  plugins: []
};
