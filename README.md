# eslint-plugin-localize-usage

Eslint rules for enforcing the correct usage of `localize` function and `Localize` component in the app

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-localize-usage`:

```
$ npm install eslint-plugin-localize-usage --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-localize-usage` globally.

## Usage

Add `localize-usage` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["localize-usage"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "localize-usage/rule-name": "error"
  }
}
```

You can also use the recommended config instead

```json
{
  "extends": ["plugin:localize-usage/recommended"]
}
```

## Supported Rules

- [localize-usage/only-string-literal-argument](docs/rules/only-string-literal-argument.md): Enforce using static strings as keys for localize functions which we use for translation
- [localize-usage/no-invalid-identifier-in-prop-value](docs/rules/no-invalid-identifier-in-prop-value.md):  Validate string literal passed to Localize component in i18n_default_text prop is valid and has all the identifiers in values prop 