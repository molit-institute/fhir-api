module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn"
  },

  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    sourceType: "module"
  }
};
  