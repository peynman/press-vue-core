module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    indent : "off",
    "template-curly-spacing" : "off",
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    // set maximum line characters
    'max-len': ['error', 140, 4, {
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreStrings: true,
    }],
    'max-statements': ['error', 24],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
    'no-console': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'error',
    'no-empty': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always',
      },
    ],
    'no-return-await': 'warn',
    'object-shorthand': ['error', 'always'],
    'no-extra-semi': 'error',
    'prefer-const': ['error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: true,
    }],
    'no-prototype-builtins': 'off',
    'no-void': 'off',
    'no-case-declarations': 'off',

    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',

    // Not in override, these apply to non-.vue files too
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/one-component-per-file': 'off',
  },
  overrides: [
    {
      files: '**/*.js',
      rules: {
        indent: 'off',
      }
    },
    {
      files: '**/*.vue',
      rules: {
        indent: 'off',
        'vue/script-indent': ['error', 2, {
          baseIndent: 1,
          switchCase: 1,
          ignores: [],
        }],
        'vue/html-closing-bracket-newline': ['error', {
          singleline: 'never',
          multiline: 'always',
        }],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/max-attributes-per-line': ['error', {
          singleline: 5,
          multiline: {
            max: 1,
            allowFirstLine: false,
          },
        }],
        'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
      },
    },
  ],
}
