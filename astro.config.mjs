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
  integrations: [tailwind(), react(), sitemap()],
});
