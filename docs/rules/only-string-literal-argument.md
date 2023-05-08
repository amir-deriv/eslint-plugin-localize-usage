# only-string-literal-argument

Enforce using static strings as keys for localize functions which we use for translation

## Rule Details

Examples of **incorrect** code for this rule:

```js
localize(key);

localize(`some translation literal : ${key}`);

localize(some_new_variable + 'invalid use')

localize(some_new_variable + 'invalid use' + some_variable)
```

Examples of **correct** code for this rule:

```js
localize("key");

localize(`key`);
```

### Options

```
...
```
