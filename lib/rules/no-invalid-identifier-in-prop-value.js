"use strict";

const { checkLocalizeComponentUsage } = require("../utils");

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
    messages: {
      invalidTemplateLiteral:
        "template literal could not have an expression in i18n_default_text prop value",
      passCorrectProperties:
        "values prop must have properties ({{ identifiers }}) defined in string literal",
      avoidExtraProperties:
        "{{ property }} is not required for the i18_default_text string literal",
    },
    fixable: null,
  },

  create(context) {
    return {
      JSXIdentifier(node) {
        if (node.name === "Localize") {
          checkLocalizeComponentUsage(node.parent.attributes, context, node);
        }
      },
    };
  },
};
