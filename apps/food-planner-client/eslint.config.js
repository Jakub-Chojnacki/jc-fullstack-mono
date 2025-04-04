import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            ["internal", "parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "*/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@hooks/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@queries/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@components/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@forms/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@layouts/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@utils/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "./**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "external"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@", "./src"],
            ["@components", "./src/app/components"],
            ["@hooks", "./src/app/hooks"],
            ["@utils", "./src/app/utils"],
            ["@forms", "./src/app/forms"],
            ["@queries", "./src/app/queries"],
            ["@layouts", "./src/app/layouts"],
          ],
          extensions: [".js", ".ts", ".jsx", ".tsx"],
        },
      },
    },
  }
);
