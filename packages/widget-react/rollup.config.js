import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";

import pkg from "./package.json";

const extensions = [".ts", ".tsx"];

export default defineConfig([
  {
    input: "src/index.ts",
    external: ["react"],
    plugins: [
      resolve({ extensions }),
      babel({ extensions, babelHelpers: "bundled" }),
    ],
    output: [
      {
        file: pkg.module,
        format: "esm",
      },
      {
        file: pkg.main,
        format: "cjs",
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
