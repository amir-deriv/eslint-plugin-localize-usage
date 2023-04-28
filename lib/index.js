"use strict";

const noDynamicTranslationKeys = require("./rules/no-dynamic-translation-keys");
const noMissingInterpolationKeys = require("./rules/no-missing-interpolation-keys");

module.exports = {
  rules: {
    "no-dynamic-translation-keys": noDynamicTranslationKeys,
    "no-missing-interpolation-keys": noMissingInterpolationKeys
  },
  configs: {
    recommended: {
      plugins: ["react-i18next"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "react-i18next/no-missing-interpolation-keys": "error"
      }
    },
    all: {
      plugins: ["react-i18next"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "react-i18next/no-dynamic-translation-keys": "error",
        "react-i18next/no-missing-interpolation-keys": "error"
      }
    }
  }
};
