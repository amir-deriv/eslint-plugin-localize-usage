"use strict";

const onlyStringLiteralArgument = require("./rules/only-string-literal-argumentno-dynamic-translation-keys");

module.exports = {
  rules: {
    "only-string-literal-argument": onlyStringLiteralArgument,
  },
  configs: {
    recommended: {
      plugins: ["react-i18next"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "react-i18next/only-string-literal-argument": "error",
      },
    },
  },
};
