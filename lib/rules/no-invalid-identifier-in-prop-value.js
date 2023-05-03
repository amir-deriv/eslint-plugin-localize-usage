
"use strict";

const { isValidUsageOfStringLiteral } = require("../utils");

const ERROR_MESSAGE = "Identifier value is not passed in values";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Validate string literal passed to Localize component in i18n_default_text prop is valid and has all the identifiers in values prop",
      category: "Best Practices",
      recommended: false,
    },
    fixable: null,
  },

  create(context) {
    return {
        JSXIdentifier(node) {
            if (node.name === "Localize") {
              if (!isValidUsageOfStringLiteral(node.parent.attributes)) {
                context.report({
                  node,
                  message: ERROR_MESSAGE
                });
              }
            }
          }
    };
  },
};
