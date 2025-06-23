// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // This is the configuration object to override rules
    rules: {
      "@typescript-eslint/no-require-imports": "off", // Keep this to allow require()

      // --- NEW/UPDATED CONFIG FOR UNUSED VARS ---
      // Option 1 (Recommended): Allow variables prefixed with underscore (like _request)
      "@typescript-eslint/no-unused-vars": [
        "error", // Keep it as an error for genuinely unused vars
        {
          "argsIgnorePattern": "^_", // Ignore arguments that start with an underscore
          "varsIgnorePattern": "^_",  // Ignore variables that start with an underscore
          "caughtErrorsIgnorePattern": "^_" // Ignore caught errors that start with an underscore
        }
      ],
      // Option 2 (If Option 1 doesn't work or you want to completely disable for unused vars):
      // "@typescript-eslint/no-unused-vars": "off",
      // --- END NEW/UPDATED CONFIG ---

      // This generic 'no-unused-vars' might still be active, keep it or remove if only TS linting is desired
      // "no-unused-vars": "off", // You can keep this or remove it, as the @typescript-eslint version is more specific
    },
  },
];

export default eslintConfig;