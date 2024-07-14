module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@emotion"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@emotion/jsx-import": "error",
    "@emotion/pkg-renaming": "error",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^jsx$" },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
