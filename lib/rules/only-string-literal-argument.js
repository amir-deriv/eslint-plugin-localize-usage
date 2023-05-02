"use strict";

const { isValidUsageOfLocalizeFunction } = require("../utils");

const ERROR_MESSAGE = "You can only use string literals with localise function";

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
    fixable: null,
  },

  create(context) {
    return {
      Identifier(node) {
        if (node.name === "localize" && node.parent.type == "CallExpression") {
          if (!isValidUsageOfLocalizeFunction(node)) {
            context.report({
              node,
              message: ERROR_MESSAGE,
            });
          }
        }
      },
    };
  },
};
