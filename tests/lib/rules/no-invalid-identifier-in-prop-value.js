//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-invalid-identifier-in-prop-value");

const parsers = require("../../helpers/parsers");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

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
          message: "template literal could not have an expression in i18n_default_text prop value",
          line: 3,
          column: 38,
          type: "TemplateLiteral",
        },
      ],
    },
    {
      code: `<Localize i18n_default_text="You cannot use your real money account {{website_name}} with at this time." />`,
      errors: [
        {
          message: "values prop must have properties (website_name) defined in string literal",
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
          message: "values prop must have properties (variable_name) defined in string literal",
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
          message: "someOtherKey is not required for the i18_default_text string literal",
          line: 4,
          column: 23,
          type: "Property",
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
          message: 'website_name is not required for the i18_default_text string literal',
          line: 4,
          column: 23,
          type: "Property",
        },
      ],
    },
  ],
});
