import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://connexus.cz",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  build: {
    // Inline all stylesheets into HTML — eliminates render-blocking
    // CSS network requests. Critical for LCP on a small static site.
    inlineStylesheets: "always",
  },
  integrations: [tailwind(), react(), sitemap()],
});
