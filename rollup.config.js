import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: true,
    },
  ],
  plugins: [typescript(), terser()],
  external: [],
};
