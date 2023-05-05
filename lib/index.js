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
      plugins: ["localize-usage"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "localize-usage/only-string-literal-argument": "error",
        "localize-usage/no-invalid-identifier-in-prop-value": "error",
      },
    },
  },
};
