const { RuleTester } = require("eslint");
const plugin = require("../index.js");
const rule = plugin.rules["use-effect-require-named-callback"];

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

ruleTester.run("use-effect-require-named-callback", rule, {
  valid: [
    // Named function expression
    {
      code: `useEffect(function handleEffect() {
        console.log('effect');
      });`,
    },

    // Named function with dependencies
    {
      code: `useEffect(function handleEffect() {
        console.log('effect with deps');
      }, [dependency]);`,
    },

    // Function declaration passed as variable
    {
      code: `
        function handleEffect() {
          console.log('effect');
        }
        useEffect(handleEffect);
      `,
    },

    // Non-useEffect calls should be ignored
    {
      code: `otherFunction(() => {
        console.log('not useEffect');
      });`,
    },
  ],

  invalid: [
    // Arrow function
    {
      code: `useEffect(() => {
        console.log('effect');
      });`,
      errors: [
        {
          messageId: "requireNamedCallback",
          type: "ArrowFunctionExpression",
        },
      ],
    },

    // Arrow function with dependencies
    {
      code: `useEffect(() => {
        console.log('effect with deps');
      }, [dependency]);`,
      errors: [
        {
          messageId: "requireNamedCallback",
          type: "ArrowFunctionExpression",
        },
      ],
    },

    // Anonymous function expression
    {
      code: `useEffect(function() {
        console.log('anonymous function');
      });`,
      errors: [
        {
          messageId: "requireNamedCallback",
          type: "FunctionExpression",
        },
      ],
    },

    // Anonymous function expression with dependencies
    {
      code: `useEffect(function() {
        console.log('anonymous function with deps');
      }, [dependency]);`,
      errors: [
        {
          messageId: "requireNamedCallback",
          type: "FunctionExpression",
        },
      ],
    },

    // Async arrow function
    {
      code: `useEffect(async () => {
        await someAsyncOperation();
      });`,
      errors: [
        {
          messageId: "requireNamedCallback",
          type: "ArrowFunctionExpression",
        },
      ],
    },

    // Complex arrow function
    {
      code: `useEffect(() => {
        const cleanup = () => {
          console.log('cleanup');
        };
        return cleanup;
      }, []);`,
      errors: [
        {
          messageId: "requireNamedCallback",
          type: "ArrowFunctionExpression",
        },
      ],
    },

    // Multiple useEffect calls
    {
      code: `
        useEffect(() => {
          console.log('first effect');
        });

        useEffect(function() {
          console.log('second effect');
        });
      `,
      errors: [
        {
          messageId: "requireNamedCallback",
          type: "ArrowFunctionExpression",
        },
        {
          messageId: "requireNamedCallback",
          type: "FunctionExpression",
        },
      ],
    },
  ],
});
