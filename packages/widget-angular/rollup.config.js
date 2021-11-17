import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";

import pkg from "./package.json";

export default defineConfig([
  {
    input: "lib/index.js",
    external: ["@angular/core", "rxjs"],
    plugins: [resolve(), babel({ babelHelpers: "bundled" })],
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
  },
  {
    input: "dts/index.d.ts",
    plugins: [dts()],
    output: {
      file: pkg.types,
      format: "esm",
    },
  },
]);
