// import { defineConfig } from "eslint/config";
import css from "@eslint/css";

import js from "@eslint/js";
import tsLint from "typescript-eslint";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

// @todo change to eslint's defineConfig function
// @see https://github.com/typescript-eslint/typescript-eslint/issues/10934
export default tsLint.config([
  {
    ignores: ["**/{dist,build,node_modules}/*", "**/*.config.*"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: [js.configs.recommended, tsLint.configs.recommendedTypeChecked],
    ignores: ["**/*.{css}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.browser },
      parser: tsLint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tsLint.plugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
    },
  },
  {
    ...css.configs.recommended,
    files: ["**/*.css"],
    language: "css/css",
    languageOptions: {
      // Fix for: CSSTree doesn't yet support nested rule delcataions.
      // @see https://github.com/eslint/css/issues/64

      // @ts-expect-error ts2353
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
      "css/require-baseline": [
        "warn",
        {
          available: "newly",
        },
      ],
      /* Rules not yet fully supported by CSSTree */
      // "css/no-invalid-at-rules": "off", // nested @rules not supported
      // "css/no-invalid-properties": "off", // nested selectors not supported.
      // Note: invalid properties should be picked up by formatter
    },
  },
]);
