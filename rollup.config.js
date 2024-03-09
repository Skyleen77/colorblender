import path from 'path';
import glob from 'glob';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

const plugins = (compilerOptions) => {
  return [
    typescript({
      tsconfigOverride: { compilerOptions },
    }),
    terser({
      ecma: 5,
      module: true,
      toplevel: true,
      compress: { pure_getters: true },
      format: { wrap_func_args: false },
    }),
  ];
};

const extensionsPaths = glob.sync('./src/extensions/*.ts');

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'es',
    },
    plugins: plugins({ declaration: true }),
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: plugins({ declaration: false }),
  },

  ...extensionsPaths.map((input) => ({
    input,
    output: {
      file: `dist/extensions/${path.parse(input).name}.mjs`,
      format: 'es',
    },
    plugins: plugins({ declaration: false }),
  })),

  ...extensionsPaths.map((input) => ({
    input,
    output: {
      file: `dist/extensions/${path.parse(input).name}.js`,
      format: 'cjs',
      exports: 'default',
    },
    plugins: plugins({ declaration: false }),
  })),
];
