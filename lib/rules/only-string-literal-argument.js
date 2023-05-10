"use strict";

const { findAndValidateLocalizeFunction } = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Enforce using static strings as keys for localize functions which we use for translation",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      onlyStringLiteralArgument:
        "localize function only accepts 1 string literal argument",
    },
    fixable: null,
  },

  create(context) {
    return {
      Identifier: (node) => findAndValidateLocalizeFunction(node, context)
    };
  },
};
