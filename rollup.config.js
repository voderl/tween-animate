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
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          allowAllFormats: true,
        }),
      ].concat(process.env.BUILD === 'production' ? [] : []),
      file: pkg.main,
      format: 'umd',
    },
    {
      name: 'Tween',
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [resolve(), commonjs(), typescript()],
};
