import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["coverage/**"],
  },
  js.configs.recommended,
  {
    files: ["*.js", "routes/**/*.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    files: ["public/assets/javascripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: globals.browser,
    },
  },
  {
    files: ["tests/**/*test.js"],
    languageOptions: {
      globals: globals.jest,
    },
  },
];