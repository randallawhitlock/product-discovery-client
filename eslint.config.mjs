// eslint.config.mjs
import { fileURLToPath, dirname } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add any project-specific rules or overrides here
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      // Example: disallow unused vars
      "no-unused-vars": "warn",
      // Add more rules as needed
    },
  },
];

export default eslintConfig;