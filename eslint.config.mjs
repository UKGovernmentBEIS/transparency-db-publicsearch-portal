import globals from "globals";

export default [
  {
    ignores: ["coverage/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
      "no-redeclare": "error",
      "no-use-before-define": "warn",
    },
  },
  {
    files: ["**/*test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];