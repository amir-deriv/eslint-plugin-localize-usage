# eslint-plugin-react-i18next

ESLint rules to help enforce i18n in react.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-i18next`:

```
$ npm install eslint-plugin-react-i18next --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-i18next` globally.

## Usage

Add `react-i18next` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["react-i18next"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "react-i18next/rule-name": "error"
  }
}
```

You can also use the recommended config instead

```json
{
  "extends": ["plugin:react-i18next/recommended"]
}
```

## Supported Rules

- [react-i18next/no-dynamic-translation-keys](docs/rules/no-dynamic-translation-keys.md): Enforce using static strings as keys for translation functions
- [react-i18next/no-missing-interpolation-keys](docs/rules/no-missing-interpolation-keys.md): Enforce passing all defined interpolation keys to translation functions
