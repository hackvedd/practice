export default [
  {
    files: ['**/*.js'], // only check .js files in server dir
    rules: {
      semi: 'error', // always use semicolons force semicolons
      'no-unused-vars': 'warn',
    },
  },
];
