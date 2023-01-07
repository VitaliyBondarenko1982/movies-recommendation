module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'prettier'],
  env: {
    es6: true,
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['import', 'react', 'react-hooks'],
  rules: {
    // js
    'arrow-parens': ['error', 'as-needed'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    curly: ['error', 'all'],
    'import/prefer-default-export': 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        // list derived from
        // https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
        // eslint-disable-next-line max-len
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        ignoreComments: false,
      },
    ],
    'max-len': [
      'error',
      {
        code: 80,
        comments: 80,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-param-reassign': [2, { props: true }],
    'no-redeclare': ['error', { builtinGlobals: true }],
    'no-restricted-exports': ['error', { restrictedNamedExports: [] }],
    'no-shadow': ['error', { builtinGlobals: false }],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
      },
    ],
    'no-unused-vars': 'error',
    'no-var': 'error',
    'object-curly-newline': [
      2,
      {
        ObjectExpression: {
          consistent: true,
          minProperties: 4,
        },
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'prefer-const': 'error',
    semi: ['error', 'always'],
    'semi-style': ['error', 'last'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'standard/no-callback-literal': 0,

    // react
    'react/destructuring-assignment': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',

    // jsx-a11y
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['id', 'nesting'],
        },
        allowChildren: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
  },
  overrides: [
    {
      files: ['**/*.stories.jsx'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      files: ['**/*.spec.js'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
