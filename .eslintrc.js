module.exports = {
   root: true,
   env: {
      browser: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/recommended',
   ],
   plugins: [
      '@typescript-eslint',
      'vue',
   ],
   parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      project: './tsconfig.json',
      extraFileExtensions: ['.vue'],
   },
   globals: {
      ga: true, // Google Analytics
      process: true,
      globalThis: false, // means it is not writeable
   },
   rules: {
      'prefer-promise-reject-errors': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-useless-escape': 'off',

      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/member-delimiter-style': ['error', {
         'overrides': {
            'interface': {
               'multiline': {
                  'delimiter': 'semi',
                  'requireLast': true,
               },
               'singleline': {
                  'delimiter': 'semi',
                  'requireLast': true,
               },
            },
            'typeLiteral': {
               'multiline': {
                  'delimiter': 'comma',
                  'requireLast': true,
               },
               'singleline': {
                  'delimiter': 'comma',
                  'requireLast': true,
               },
            },
         },
      }],

      'vue/html-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attributes-order': ['warn', {
         'order': [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
            'UNIQUE',
            'GLOBAL',
         ],
         'alphabetical': false,
      }],
      'vue/order-in-components': ['error', {
         'order': [
            'el',
            'name',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'fetch',
            'asyncData',
            'data',
            'watch',
            'computed',
            'LIFECYCLE_HOOKS',
            'methods',
            'head',
            ['template', 'render'],
            'renderError',
         ],
      }],
      'vue/html-closing-bracket-spacing': ['warn', {
         'startTag': 'never',
         'endTag': 'never',
         'selfClosingTag': 'never',
      }],
      'vue/max-attributes-per-line': ['warn', {
         'singleline': 3,
         'multiline': {
            'max': 1,
            'allowFirstLine': false,
         },
      }],
      'vue/multiline-html-element-content-newline': ['warn', {
         'allowEmptyLines': true,
      }],
   },
   ignorePatterns: [
      'docs/',
      '*.js',
      'src/main.ts',
      'src/main.d.ts',
   ],
};
