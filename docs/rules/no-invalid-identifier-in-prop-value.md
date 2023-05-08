# no-invalid-identifier-in-prop-value

Validate string literal passed to Localize component in i18n_default_text prop is valid and has all the identifiers in values prop

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Localize i18n_default_text="You cannot use your real money account {{website_name}} with at this time." />;

<Localize i18n_default_text="You cannot use your real money account {{variable_name}} with at this time." />;

<Localize
  i18n_default_text="You cannot use your real money account {{variable_name}} with at this time."
  values={{ website_name }}
/>;

const mock_value = "mock_value";
<Localize i18n_default_text={`You cannot use your real money account ${mock_value} with at this time.`} />


<Localize
    i18n_default_text="You cannot use your real money account {{website_name}} with at this time."
    values={{ someOtherKey: 'value', website_name }}
/>;


<Localize
    i18n_default_text="You cannot {{some_other_variable}} use your real {{some_other_variable}} money account {{variable_name}} with at this time."
    values={{ variable_name }}
/>;
```

Examples of **correct** code for this rule:

```js
<Localize
  i18n_default_text="You cannot use your real money account with {{website_name}} at this time."
  values={{ website_name }}
/>;

<Localize i18n_default_text="You cannot use your real money account with at this time." />;

<Localize
  i18n_default_text={`You cannot use your real money account with at this time.`}
/>;
```

### Options

```
...
```
