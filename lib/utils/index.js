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

function checkLocalizeComponentUsage(componentProps = [], context, node) {
  let identifiersListInString = [];

  const i18nDefaultPropNode = componentProps.find((x) => x.name.name === "i18n_default_text");
  const valuesPropNode = componentProps.find((x) => x.name.name === "values");

  if (
    (i18nDefaultPropNode.value.expression || {}).type === "TemplateLiteral" &&
    i18nDefaultPropNode.value.expression.expressions.length > 0
  ) {
    context.report({
      node: i18nDefaultPropNode.value.expression,
      loc: i18nDefaultPropNode.value.expression.loc,
      messageId: "invalidTemplateLiteral"
    });
    return;
  }

  identifiersListInString = findIdentifierInString(i18nDefaultPropNode.value.value);

  if (identifiersListInString.length > 0) {
    if (!valuesPropNode) {
      context.report({
        node: node,
        messageId: "passCorrectProperties",
        data: {
          identifiers: identifiersListInString.join(", ")
        }
      });
      return false;
    }

    return isPropertyFromValidStringIdentifiers(valuesPropNode.value.expression.properties, identifiersListInString, context);
  }
}

function isPropertyFromValidStringIdentifiers(nodeProperties = [], identifiersInLiteral = [], context) {
  let isAllIdentifiersInTheList = true;

  const uniqueIdentifiersInLiteral = new Set(identifiersInLiteral);

  let index = null;

  nodeProperties.some((x, i) => {
    if (!uniqueIdentifiersInLiteral.has(x.key.name)) {
      isAllIdentifiersInTheList = false;
      index = i;
      return true;
    }
  });

  if (index !== null) {
    context.report({
      node: nodeProperties[index],
      messageId: "avoidExtraProperties",
      data: {
        property: nodeProperties[index].key.name
      }
    });
  }

  return isAllIdentifiersInTheList;
}

function findIdentifierInString(stringLiteral) {
  const regex = /{{(.*?)}}/g;
  let match;
  let identifiers = [];

  while ((match = regex.exec(stringLiteral)) !== null) {
    identifiers.push(match[1]);
  }

  return identifiers;
}

module.exports = {
  validateLocalizeArguments,
  isValidUsageOfLocalizeFunction,
  isPropertyFromValidStringIdentifiers,
  findIdentifierInString,
  checkLocalizeComponentUsage,
};
