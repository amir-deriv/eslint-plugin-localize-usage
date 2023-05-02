"use strict";

function isValidUsageOfLocalizeFunction(node) {
  if (validateLocalizeArguments(node.parent.arguments)) {
    return false;
  }

  return true;
}

function validateLocalizeArguments(args = []) {
  const hasIdentifier = args.some((x) => {
    if (x.type === "Identifier") {
      return true;
    } else if (x.type === "TemplateLiteral") {
      return x.expressions.some((x) => x.type === "Identifier");
    }
  });

  return hasIdentifier ? true : false;
}

module.exports = {
  validateLocalizeArguments,
  isValidUsageOfLocalizeFunction
};
