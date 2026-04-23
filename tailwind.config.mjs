/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#FAF8F5",
          secondary: "#F2EEE6",
          tertiary: "#EAE4D8",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#4A4A4A",
          muted: "#7A7A7A",
        },
        accent: {
          DEFAULT: "#B4542A",
          hover: "#9A4523",
          subtle: "#E8D5C7",
        },
        border: {
          subtle: "#E0DCD4",
          strong: "#C9C2B5",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["44px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["48px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "h2-sm": ["32px", { lineHeight: "1.15" }],
        h3: ["28px", { lineHeight: "1.25" }],
        "h3-sm": ["22px", { lineHeight: "1.3" }],
        "body-lg": ["20px", { lineHeight: "1.6" }],
        body: ["17px", { lineHeight: "1.65" }],
        small: ["14px", { lineHeight: "1.5" }],
      },
      maxWidth: {
        content: "1152px",
        prose: "768px",
      },
      borderRadius: {
        sharp: "0",
        subtle: "2px",
        soft: "4px",
        pill: "8px",
      },
    },
  },
  plugins: [],
};
