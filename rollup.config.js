import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync'
import clear from 'rollup-plugin-clear'
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

const entrypoint = 'app';
const outputDir = 'docs';

// Optimise for production delivery
const { NODE_ENV: environment = 'production', ROLLUP_WATCH: watch = false } = process.env;
const jsMin = environment === 'development' ? '' : '.min';
const jsFile = `${entrypoint}${jsMin}.js`;

const globals = {
  vue: 'Vue',
};

export default {
  input: `src/${entrypoint}.js`,
  external: [ 'vue' ],
  output: [
    { file: `${outputDir}/${jsFile}`, format: 'iife', globals },
  ],
  plugins: [
    clear({
      targets: [ outputDir ],
    }),
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
    scss({
      output: `${outputDir}/style.css`,
      includePaths: ['./src/scss'],
    }),
    copy({
      targets: [
        {
          src: 'src/index.html',
          dest: outputDir,
          transform: (x) => x.toString().replace('__SCRIPT__', jsFile).replace('__MIN__', jsMin),
        },
        {
          src: [
            `node_modules/vue/dist/vue${jsMin}.js`,
          ],
          dest: `${outputDir}/vendor`,
        },
      ],
      hook: 'buildStart',
      copyOnce: true,
    }),
    watch && browsersync({
      server: 'docs',
      reloadDebounce: 1000,
    }),
  ],
};
