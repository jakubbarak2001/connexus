/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Světlé "paper" pozadí — výchozí povrchy stránky.
        bg: {
          primary: "#F4F1EA",
          secondary: "#EFEBE1",
          tertiary: "#E9E4D6",
          elevated: "#FBF9F4",
        },
        text: {
          primary: "#181511",
          secondary: "#4A4538",
          muted: "#6E6859",
        },
        accent: {
          DEFAULT: "#F54A00",
          hover: "#D84100",
          subtle: "#FFE0D1",
          // Pro DROBNÝ oranžový text na papíru (mono labely) — splňuje
          // kontrast 4,5:1; plný akcent tam projde jen u velkých nadpisů.
          deep: "#C73B00",
        },
        border: {
          subtle: "#DCD6C8",
          strong: "#A8A18E",
        },
        // Explicitní barvy pro invertované (tmavé/oranžové) pásy sekcí.
        ink: {
          DEFAULT: "#181511",
          soft: "#26221B",
          line: "#3B362C",
          mutedtext: "#A39C8B",
        },
        paper: {
          DEFAULT: "#F4F1EA",
          dim: "#D9D4C6",
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
