import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

/* eslint-disable */
export default {
  input: "src/components/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    babel({ babelHelpers: "bundled", presets: ["@babel/preset-react"] }),
    commonjs(),
    terser(),
  ],
  external: ["react"],
};
