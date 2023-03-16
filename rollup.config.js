import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'Animate',
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'Animate',
      plugins: process.env.BUILD === 'production' ? [terser()] : [],
      file: pkg.main,
      format: 'umd',
      sourcemap: false,
    },
    plugins: [
      typescript(
        process.env.BUILD === 'production'
          ? {
              tsconfigOverride: { compilerOptions: { target: 'es5' } },
            }
          : {},
      ),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/tween-animate.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
