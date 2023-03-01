module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "prettier",
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    "vue/padding-line-between-blocks": ["error", "always"],

    "import/no-unresolved": "off",
    "import/newline-after-import": ["error", { count: 1 }],

    "@typescript-eslint/interface-name-prefix": "off",

    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },

  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
