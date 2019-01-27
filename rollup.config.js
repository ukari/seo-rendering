let async = require('rollup-plugin-async');
let {terser} = require('rollup-plugin-terser');
let autoExternal = require('rollup-plugin-auto-external');

module.exports = {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    autoExternal(),
    async(),
    terser(),
  ],
}
