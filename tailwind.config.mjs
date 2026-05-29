/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0E1218",
          secondary: "#141923",
          tertiary: "#1B2230",
          elevated: "#222B3B",
        },
        text: {
          primary: "#F2F0EC",
          secondary: "#B5B7BD",
          muted: "#838894",
        },
        accent: {
          DEFAULT: "#FF7A45",
          hover: "#FF9366",
          subtle: "#3A2820",
        },
        border: {
          subtle: "#262C38",
          strong: "#3A4150",
        },
        chrome: {
          frame: "#0A0E14",
          bar: "#161B24",
        },
      },
      fontFamily: {
        serif: ["Newsreader", '"Newsreader Fallback"', "Georgia", "serif"],
        sans: ["Inter", '"Inter Fallback"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["72px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["44px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["48px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "h2-sm": ["32px", { lineHeight: "1.1" }],
        h3: ["28px", { lineHeight: "1.2" }],
        "h3-sm": ["22px", { lineHeight: "1.2" }],
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
