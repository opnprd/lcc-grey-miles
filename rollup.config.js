import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

const entrypoint = 'app';
const outputDir = 'docs';

const globals = {
  vue: 'Vue',
};

export default {
  input: `src/${entrypoint}.js`,
  external: [ 'vue' ],
  output: [
    { file: `${outputDir}/${entrypoint}.js`, format: 'iife', globals },
    { file: `${outputDir}/${entrypoint}.min.js`, format: 'iife', globals },
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    babel({
      configFile: false,
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
      ],
    }),
    terser({
      include: [/^.+\.min\.js$/, '*esm*'], 
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: outputDir },
        {
          src: [
            'node_modules/vue/dist/vue.js',
          ],
          dest: `${outputDir}/vendor`,
        },
      ],
    }),
  ],
};
