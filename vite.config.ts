/// <reference types="@vitest/browser/providers/playwright" />
/// <reference types="vitest" />

import { reactRouter } from "@react-router/dev/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  build: {
    target: "es2023",
  },
  css: {
    modules: {
      generateScopedName: `[folder]_[local]__[hash:base64:5]`,
    },
  },
  plugins: [
    mode === "test" ? react() : reactRouter(),
    ViteImageOptimizer(),
    tsconfigPaths(),
    devtoolsJson(),
  ],
  base: "/", // Set the base URL for your GitHub Pages site
  test: {
    globals: true,
    include: ["app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    css: true,
    browser: {
      enabled: true,
      provider: "playwright",
      // https://vitest.dev/guide/browser/playwright
      instances: [
        { browser: "chromium" },
        { browser: "firefox" },
        { browser: "webkit" },
      ],
    },
  },
}));
