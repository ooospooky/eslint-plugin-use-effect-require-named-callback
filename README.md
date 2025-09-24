# eslint-plugin-use-effect-require-named-callback

An ESLint plugin that requires useEffect callbacks to be named functions instead of anonymous functions, improving code readability and debugging experience.

## Installation

```bash
pnpm install --save-dev eslint-plugin-use-effect-require-named-callback
```

## Usage

### ESLint 9+ (Flat Config)

```javascript
// eslint.config.js
import useEffectRequireNamedCallback from "eslint-plugin-use-effect-require-named-callback";

export default [
  {
    plugins: {
      "use-effect": useEffectRequireNamedCallback,
    },
    rules: {
      "use-effect/use-effect-require-named-callback": "error",
    },
  },
];
```

### ESLint 8 and below (Legacy Config)

```json
{
  "plugins": ["use-effect-require-named-callback"],
  "rules": {
    "use-effect-require-named-callback/use-effect-require-named-callback": "error"
  }
}
```

## What it does

This rule enforces using named functions as useEffect callbacks instead of anonymous arrow functions or anonymous function expressions.

### ❌ Incorrect

```javascript
// Anonymous arrow function
useEffect(() => {
  console.log("component mounted");
});

// Anonymous function expression
useEffect(function () {
  console.log("component mounted");
});

// Async arrow function
useEffect(async () => {
  await fetchData();
});
```

### ✅ Correct

```javascript
// Named function expression
useEffect(function handleMount() {
  console.log("component mounted");
});

// Function declaration passed as variable
function handleMount() {
  console.log("component mounted");
}
useEffect(handleMount);

// Named function with dependencies
useEffect(
  function handleDataUpdate() {
    fetchData();
  },
  [dependency]
);
```

## Why use this rule?

### Core Benefits:

1. **Improved debugging experience**: Named functions appear clearly in stack traces, making debugging easier
2. **Better code readability**: Named functions provide context about what the effect does
3. **Self-documenting code**: Function names serve as inline documentation for effect purposes
4. **Consistency**: Enforces a consistent pattern across your React application

### Debugging Comparison

**Without named functions:**

```
Stack trace:
  at <anonymous> (Component.js:15:8)
  at useEffect (react.js:...)
```

**With named functions:**

```
Stack trace:
  at handleDataFetch (Component.js:15:8)
  at useEffect (react.js:...)
```
