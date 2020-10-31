import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
//terser API : https://github.com/terser/terser#compress-options
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'Tween',
      file: pkg.main,
      format: 'esm',
      plugins: [
        getBabelOutputPlugin({ presets: [['@babel/env', { modules: 'umd' }]] }),
      ].concat(process.env.BUILD === 'production' ? [terser()] : []),
    },
    {
      name: 'Tween',
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [resolve(), commonjs(), typescript()],
};
