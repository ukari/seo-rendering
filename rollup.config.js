let async = require('rollup-plugin-async');
let {terser} = require('rollup-plugin-terser');

module.exports = {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  },
  plugins: [
    async(),
    terser(),
  ]
}
