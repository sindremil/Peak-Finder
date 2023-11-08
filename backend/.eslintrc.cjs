module.exports = {
  extends: ["airbnb", "airbnb-typescript", "eslint-config-prettier"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "no-console": "off",
  },
};
