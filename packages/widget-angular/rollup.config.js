import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import dts from 'rollup-plugin-dts'

import pkg from './package.json'

export default defineConfig([
	{
		input: 'lib/index.js',
		external: ['@angular/core', 'rxjs', '@livechat/widget-core'],
		plugins: [
			resolve(),
			replace({
				'process.env.PACKAGE_NAME': JSON.stringify(pkg.name),
				preventAssignment: true,
			}),
			babel({ babelHelpers: 'bundled' }),
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
