module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react-hooks', 'import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react-native/no-unused-styles': 'error', // Warns about unused styles
    'react-native/no-inline-styles': 'warn', // Warns about inline styles
    'react-hooks/rules-of-hooks': 'error', // Ensures that Hooks are called in a proper manner
    'react-hooks/exhaustive-deps': 'error', // Warns about missing dependencies in useEffect and similar Hooks
    '@typescript-eslint/no-explicit-any': 'off', // Warns about using any explicitly
    '@typescript-eslint/no-unused-vars': 'error', // Warns about unused vars
    'import/no-unresolved': 'error',

    // Best practices
    'no-console': 'warn', // Avoid using console.log in production
  },
};
