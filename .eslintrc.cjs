/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  env: { browser: true, es2023: true },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.+(cjs|js|mjs)"],
    },
    {
      env: { node: true },
      files: ["./**/*.cjs"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.node.json"],
    tsConfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react-refresh"],
  root: true,
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    curly: ["error", "all"],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: true,
    },
    react: {
      version: "detect",
    },
  },
};
