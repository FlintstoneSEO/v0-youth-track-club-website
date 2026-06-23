import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import editableRegions from "@cloudcannon/editable-regions/astro-integration";

export default defineConfig({
  output: "static",
  site: "https://www.lansingatc.com",
  integrations: [editableRegions()],
  vite: {
    plugins: [tailwindcss()],
  },
});
