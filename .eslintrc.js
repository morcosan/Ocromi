module.exports = {
   root: true,
   env: {
      browser: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/essential',
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
      'quotes': ['warn', 'single'],
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
   },
   ignorePatterns: [
      'docs/',
      '*.js',
      'src/main.ts',
      'src/main.d.ts',
   ],
};
