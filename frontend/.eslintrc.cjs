module.exports = {
  plugins: ["@tanstack/query"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "eslint-config-prettier",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
