module.exports = {
  parserOptions: {
    project: './packages/vuetify/tsconfig.dev.json',
  },
  globals: {
    __VUETIFY_VERSION__: true,
    __REQUIRED_VUE__: true,
  },
  extends: [
    // 'plugin:import/typescript', // slow, only enable if needed
  ],
  rules: {
    "no-var": "error",
    // allow paren-less arrow functions
    "arrow-parens": ["error", "as-needed"],
    // set maximum line characters
    "max-len": [
      "error",
      {
        code: 140,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
      },
    ],
    complexity: ["error", 32],
    semi::"off",
    quotes: [
      "off",
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    "no-console": "off",
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "only-multiline",
      },
    ],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-return-assign": "off",
    "no-unused-vars": "error",
    "no-empty": "error",
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "space-before-function-paren": [
      "off",
      {
        anonymous: "always",
        named: "always",
        asyncArrow: "always",
      },
    ],
    "no-return-await": "warn",
    "object-shorthand": ["error", "always"],
    "no-extra-semi": "error",
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: true,
      },
    ],
    "no-prototype-builtins": "off",
    "no-void": "off",
    "no-case-declarations": "off",
    indent: [
      "warn",
      2,
      {
        ...require("eslint-config-standard").rules.indent[2],
        flatTernaryExpressions: true,
        offsetTernaryExpressions: false,
      },
    ],
    "sort-imports": [
      "warn",
      {
        ignoreDeclarationSort: true,
        ignoreCase: true,
      },
    ],
    "multiline-ternary": "off",

    "sonarjs/cognitive-complexity": "off",
    "sonarjs/no-duplicate-string": "off",

    // Not in override, these apply to non-.vue files too
    "vue/require-default-prop": "off",
    "vue/require-prop-types": "off",
    "vue/one-component-per-file": "off",
    "vue/custom-event-name-casing": [
      "error",
      { ignores: ["/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u"] },
    ],
  },
  overrides: [
    {
      files: 'src/**/*',
      rules: {
        'local-rules/sort-imports': 'warn',
      },
    },
    {
      files: 'dev/Playground.vue',
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: '**/*.spec.{ts,tsx}',
      env: {
        'jest/globals': true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'local-rules/jest-global-imports': 'error',

        'no-restricted-imports': 'off',

        'jest/no-disabled-tests': 'off',
        'jest/no-large-snapshots': 'warn',
        'jest/prefer-spy-on': 'warn',
        'jest/prefer-to-be': 'warn',
        'jest/prefer-to-contain': 'warn',
        'jest/prefer-to-have-length': 'warn',
        'jest/no-standalone-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-identical-title': 'off',
      },
    },
    {
      files: '**/*.spec.cy.{ts,tsx}',
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'local-rules/cypress-types-reference': 'error',

        'no-restricted-imports': 'off',

        'no-unused-expressions': 'off',
        'cypress/no-assigning-return-values': 'error',
        'cypress/no-unnecessary-waiting': 'warn',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/no-async-tests': 'error',
        'cypress/unsafe-to-chain-command': 'off',
      },
    },
  ],
}
