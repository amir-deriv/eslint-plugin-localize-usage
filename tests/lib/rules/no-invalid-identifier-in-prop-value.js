//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-invalid-identifier-in-prop-value");

const parsers = require("../../helpers/parsers");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ERROR_MESSAGE = "Identifier value is not passed in values";

const ruleTester = new RuleTester({ parser: parsers.BABEL_ESLINT });
ruleTester.run("no-invalid-identifier-in-prop-value", rule, {
  valid: [
    {
      code: `
        <Localize
            i18n_default_text="You cannot use your real money account with {{website_name}} at this time."
            values={{ website_name }}
        />;
    `,
    },
    {
      code: `
        <Localize i18n_default_text="You cannot use your real money account with at this time." />
      `,
    },
    {
      code:
        "<Localize i18n_default_text={`You cannot use your real money account with at this time.`} />",
    },
  ],

  invalid: [
    {
      code: `
        const mock_value = "mock_value";
        <Localize i18n_default_text={\`You cannot use your real money account \$\{mock_value\} with at this time.\`} />
      `,
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 3,
          column: 10,
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `<Localize i18n_default_text="You cannot use your real money account {{website_name}} with at this time." />`,
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 1,
          column: 2,
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `<Localize i18n_default_text="You cannot use your real money account {{variable_name}} with at this time." />`,
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 1,
          column: 2,
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `
        <Localize
            i18n_default_text="You cannot use your real money account {{website_name}} with at this time."
            values={{ someOtherKey: website_name }}
        />;
      `,
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 2,
          column: 10,
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `
        <Localize
            i18n_default_text="You cannot use your real money account {{variable_name}} with at this time."
            values={{ website_name }}
        />;
      `,
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 2,
          column: 10,
          type: "JSXIdentifier",
        },
      ],
    },
  ],
});
