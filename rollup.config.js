import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import html from "rollup-plugin-generate-html-template";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const IS_PROD = process.env.NODE_ENV === "production";

const commonPlugins = [
  html({
    template: "./src/main.html",
    target: "index.html",
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  }),
  resolve({
    mainFields: ["module", "main", "browser"],
    browser: true,
  }),
  typescript({
    clean: true,
    tsconfig: "./tsconfig.json",
    rollupCommonJSResolveHack: true,
    tsconfigDefaults: {
      compilerOptions: {
        sourceMap: true,
        declaration: true,
        jsx: "react",
      },
    },
    tsconfigOverride: {
      compilerOptions: {
        target: "esnext",
      },
    },
  }),
  babel({
    passPerPreset: true,
    runtimeHelpers: true,
    exclude: "node_modules/**",
    presets: [
      [
        "@babel/preset-env",
        {
          loose: true,
          modules: false,
        },
      ],
    ],
    extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
  }),
  commonjs({
    include: /\/node_modules\//,
    namedExports: {
      "node_modules/react/index.js": [
        "Children",
        "Component",
        "useEffect",
        "useState",
        "useContext",
        "PureComponent",
        "PropTypes",
        "createElement",
        "Fragment",
        "cloneElement",
        "StrictMode",
        "createFactory",
        "createRef",
        "createContext",
        "isValidElement",
        "isValidElementType",
      ],
      "node_modules/react-is/index.js": [
        "isElement",
        "isValidElementType",
        "ForwardRef",
      ],
    },
  }),
];

const config = IS_PROD
  ? {
      input: "./src/index.tsx",
      output: {
        file: "./dist/bundle.js",
        format: "cjs",
        globals: { "styled-components": "styled" },
        exports: "named",
      },
      plugins: commonPlugins.concat([
        terser({
          compress: {
            keep_infinity: true,
            pure_getters: true,
            passes: 12,
            dead_code: true,
            drop_console: true,
          },
          toplevel: true,
          ecma: 6,
          warnings: true,
        }),
      ]),
    }
  : {
      input: "./src/index.tsx",
      output: {
        file: "./dist/bundle.js",
        format: "cjs",
        globals: { react: "React", "styled-components": "styled" },
        exports: "named",
      },
      plugins: commonPlugins.concat([
        serve({
          contentBase: "dist",
          port: 1337,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }),
        livereload({
          watch: "dist",
          verbose: true,
          https: false,
        }),
      ]),
    };

export default config;
