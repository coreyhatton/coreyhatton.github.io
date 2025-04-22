import css from "@eslint/css";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tsEslint from "typescript-eslint";

/**
 * Js config for eslint
 */
const jsConfig = defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    // @ts-expect-error (ts2322) @see https://github.com/typescript-eslint/typescript-eslint/issues/10934
    extends: [js.configs.recommended, tsEslint.configs.recommended],
    ignores: ["**/*.{css}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      // @ts-expect-error (ts2322) @see https://github.com/typescript-eslint/typescript-eslint/issues/10934
      "@typescript-eslint": tsEslint.plugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
    },
  },
]);

/**
 * Css config for eslint
 */
const cssConfig = defineConfig([
  {
    files: ["**/*.css"],
    extends: [css.configs.recommended],
    language: "css/css",
    languageOptions: {
      // Fix for: CSSTree doesn't yet support nested rule delcataions.
      // @see https://github.com/eslint/css/issues/64
      tolerant: true,
    },
    rules: {
      "css/no-duplicate-imports": "warn",
      "css/prefer-logical-properties": [
        "warn",
        {
          allowProperties: ["overflow-x", "overflow-y"],
        },
      ],
      "css/use-baseline": [
        "warn",
        {
          available: "newly",
        },
      ],
      /* Rules not yet fully supported by CSSTree */
      "css/no-invalid-at-rules": "off", // nested @rules not supported
      "css/no-invalid-properties": "off", // nested selectors not supported.
      // Note: invalid properties should already be picked up by formatter
    },
  },
]);

/**
 * Enforces css layer naming rules depending on file location
 */
const cssLayerConfigs = defineConfig([
  ["components", "layouts"].map((layer) => {
    return {
      files: [`**/${layer}/**/*.css`],
      extends: [cssConfig],
      rules: {
        // "css/use-layers": [
        //   "error",
        //   {
        //     layerNamePattern: `^${layer}`,
        //   },
        // ],
        "css/use-layers": "error",
      },
    };
  }),
]);

export default defineConfig([
  {
    ignores: ["**/{dist,build,node_modules}/*", "**/*.config.*"],
  },
  jsConfig,
  cssConfig,
  cssLayerConfigs,
]);
