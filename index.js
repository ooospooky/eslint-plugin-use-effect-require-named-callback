/**
 * Custom ESLint rule: use-effect-require-named-callback
 *
 * Requires useEffect callbacks to be named functions instead of anonymous functions.
 *
 * Example:
 * useEffect(() => { ... }) --> ERROR
 * useEffect(function() { ... }) --> ERROR
 * useEffect(function handleEffect() { ... }) --> OK
 *
 * @type {import('eslint').Rule.RuleModule}
 */

const { AST_NODE_TYPES } = require("@typescript-eslint/utils");

const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "require useEffect callbacks to be named functions instead of anonymous functions",
      category: "Best Practices",
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      requireNamedCallback:
        "useEffect callback should be a named function instead of an anonymous function.",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        // Check if this is a useEffect call
        if (
          node.callee.type !== AST_NODE_TYPES.Identifier ||
          node.callee.name !== "useEffect"
        ) {
          return;
        }

        // Check if there's a first argument (the callback)
        if (node.arguments.length === 0) {
          return;
        }

        const useEffectCallbackFunction = node.arguments[0];

        // Allow named function expressions
        if (
          useEffectCallbackFunction.type ===
            AST_NODE_TYPES.FunctionExpression &&
          useEffectCallbackFunction.id !== null
        ) {
          return;
        }

        // Allow function declarations passed as variables
        if (useEffectCallbackFunction.type === AST_NODE_TYPES.Identifier) {
          return;
        }

        context.report({
          node: useEffectCallbackFunction,
          messageId: "requireNamedCallback",
        });
      },
    };
  },
};

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  meta: {
    name: "eslint-plugin-use-effect-require-named-callback",
    version: "1.0.0",
  },
  rules: {
    "use-effect-require-named-callback": rule,
  },
};
