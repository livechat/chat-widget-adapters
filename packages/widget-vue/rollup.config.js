import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import dts from 'rollup-plugin-dts'

import pkg from './package.json'

const extensions = ['.ts']

export default defineConfig([
	{
		input: 'src/index.ts',
		external: ['vue', '@livechat/widget-core'],
		plugins: [
			resolve({ extensions }),
			replace({ 'process.env.PACKAGE_NAME': JSON.stringify(pkg.name), preventAssignment: true }),
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
			{
				file: pkg.unpkg,
				format: 'umd',
				name: 'LiveChatWidgetVue',
				globals: {
					vue: 'Vue',
					'@livechat/widget-core': 'LiveChatWidgetCore',
				},
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
