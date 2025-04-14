import antfu from "@antfu/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default antfu(
  {
    react: true,
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "ts/no-redeclare": "off",
      "eslint-comments/no-unlimited-disable": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "react/no-nested-component-definitions": "warn",
      "ts/no-use-before-define": "warn",
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": [
        "off",
        {
          tsconfigRootDir: ".",
        },
      ],
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "pathGroups": [
            {
              pattern: "@hooks/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@queries/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@components/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@forms/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@layouts/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@utils/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "{@/consts/**,./**/consts,../**/consts}",
              group: "sibling",
              position: "after",
            },
            {
              pattern: "{./styles,./styles.scss,./styles.module.scss}",
              group: "sibling",
              position: "after",
            },
            {
              pattern: "./types",
              group: "sibling",
              position: "after",
            },
          ],
          "pathGroupsExcludedImportTypes": [],
          "alphabetize": {
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
  },
);
