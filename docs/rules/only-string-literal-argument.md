# Enforce using static strings as keys for localize functions which we use for translation (only-string-literal-argument)

## Rule Details

Examples of **incorrect** code for this rule:

```js
localize(key);

localize(`some translation literal : ${key}`);
```

Examples of **correct** code for this rule:

```js
localize("key");

t(`key`);
```

### Options

```
...
```
