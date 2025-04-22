import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    modules: {
      generateScopedName: `[folder]_[local]__[hash:base64:5]`,
    },
  },
  server: {
    port: 8002,
  },
  plugins: [reactRouter(), ViteImageOptimizer(), tsconfigPaths()],
  base: "/", // Set the base URL for your GitHub Pages site
});
