"use strict";

const { validateLocalizeArguments } = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Enforce using static strings as keys for localize functions which we use for translation",
      category: "Best Practices",
      recommended: false,
    },
    messages: {
      onlyStringLiteralArgument:
        "You can only use string literals with localise function",
    },
    fixable: null,
  },

  create(context) {
    return {
      Identifier(node) {
        if (node.name === "localize" && node.parent.type == "CallExpression") {
          validateLocalizeArguments(node.parent.arguments, context);
        }
      },
    };
  },
};
