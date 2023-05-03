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

function isValidUsageOfStringLiteral(componentProps = []) {
  let identifiersListInString = [];

  const i18nDefaultPropNode = componentProps.find(
    (x) => x.name.name === "i18n_default_text"
  );
  const valuesPropNode = componentProps.find((x) => x.name.name === "values");

  identifiersListInString = findIdentifierInString(
    i18nDefaultPropNode.value.value
  );

  if (identifiersListInString.length > 0) {
    if (!valuesPropNode) {
      return false;
    }

    return isPropertyFromValidStringIdentifiers(
      valuesPropNode.value.expression.properties,
      identifiersListInString
    );
  } else {
    return true;
  }
}

function isPropertyFromValidStringIdentifiers(
  nodeProperties = [],
  identifiersInLiteral = []
) {
  let isAllIdentifiersInTheList = true;

  const uniqueIdentifiersInLiteral = new Set(identifiersInLiteral);

  nodeProperties.some((x) => {
    if (!uniqueIdentifiersInLiteral.has(x.value.name)) {
      isAllIdentifiersInTheList = false;
      return true;
    }
  });

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
  isValidUsageOfStringLiteral,
  isValidUsageOfLocalizeFunction,
  isPropertyFromValidStringIdentifiers,
  findIdentifierInString,
};
