// eslint.config.mjs
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import angularEslint from "@angular-eslint/eslint-plugin";

export default [
  {
    // Allgemeine Konfiguration für TypeScript- und JavaScript-Dateien
    files: ["**/*.{ts,js,mjs,cjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angularEslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
    },
  }
];
