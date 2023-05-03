"use strict";

const noInvalidIdentifierInPropValue = require("./rules/no-invalid-identifier-in-prop-value");
const onlyStringLiteralArgument = require("./rules/only-string-literal-argumentno-dynamic-translation-keys");

module.exports = {
  rules: {
    "only-string-literal-argument": onlyStringLiteralArgument,
    "no-invalid-identifier-in-prop-value": noInvalidIdentifierInPropValue
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
        "react-i18next/no-invalid-identifier-in-prop-value": "error",
      },
    },
  },
};
