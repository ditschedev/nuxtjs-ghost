module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018
  },
  extends: [
    'prettier'
  ],
  plugins: ['prettier', 'vue'],
}
