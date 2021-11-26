import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'

import pkg from './package.json'

const extensions = ['.ts']

export default defineConfig([
	{
		input: 'src/index.ts',
		plugins: [
			resolve({ extensions }),
			replace({ 'process.env.PACKAGE_NAME': JSON.stringify(pkg.name) }),
			babel({ extensions, babelHelpers: 'bundled' }),
		],
		output: [
			{
				file: pkg.main,
				format: 'cjs',
			},
			{
				file: pkg.module,
				format: 'esm',
			},
		],
	},
	{
		input: 'dts/index.d.ts',
		plugins: [dts()],
		output: {
			file: pkg.types,
			format: 'esm',
		},
	},
])
