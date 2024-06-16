module.exports = {
  extends: [
    "expo",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint"],
  ignorePatterns: [
    "node_modules/",
    "android/",
    "ios/",
    "metro.config.js",
    "babel.config.js",
    "tailwind.config.js",
  ],
  rules: {
    "react/no-unescaped-entities": 0,
    "@typescript-eslint/ban-types": 0,
    // Prefer using `logger.debug` over `console.log`
    "no-console": 1,
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "props",
        varsIgnorePattern: "^_",
      },
    ],
    "tailwindcss/no-custom-classname": 0,
    "@next/next/no-img-element": 0,
    "@typescript-eslint/consistent-type-imports": "error",
    "prefer-template": "error",
    "@typescript-eslint/array-type": 2,
    "@typescript-eslint/member-ordering": 2,
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
