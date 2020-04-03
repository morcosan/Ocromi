module.exports = {
   root: true,

   // Rules order is important, please avoid shuffling them
   extends: [
      // Base ESLint recommended rules
      'eslint:recommended',

      // ESLint typescript rules
      // See https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',

      // `plugin:vue/essential` by default, consider switching to `plugin:vue/strongly-recommended`
      //  or `plugin:vue/recommended` for stricter rules.
      // See https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      'plugin:vue/essential',
   ],

   plugins: [
      // Required to apply rules which need type information
      '@typescript-eslint',
      // Required to lint *.vue files
      // See https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
      'vue',
      // Prettier has not been included as plugin to avoid performance impact
      // See https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
      // Add it as an extension
   ],

   // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
   // See https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
   // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
   parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      project: './tsconfig.json',
      extraFileExtensions: ['.vue'],
   },

   env: {
      browser: true,
   },

   globals: {
      ga: true, // Google Analytics
      cordova: true,
      __statics: true,
      process: true,
      globalThis: false, // means it is not writeable
   },

   // add your custom rules here
   rules: {
      'prefer-promise-reject-errors': 'off',
      'quotes': ['warn', 'single'],
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // allow unused vars in development
      '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // allow console.log during development only
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      // Correct typescript linting until at least 2.0.0 major release
      // See https://github.com/typescript-eslint/typescript-eslint/issues/501
      // See https://github.com/typescript-eslint/typescript-eslint/issues/493
      '@typescript-eslint/explicit-function-return-type': 'off',
   },

   ignorePatterns: [
      'docs/',
      '*.js',
   ],
};
