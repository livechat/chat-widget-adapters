import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

import pkg from './package.json'

const input = 'src/index.ts'
const extensions = ['.ts']

const baseConfig = defineConfig({
	input,
	plugins: [
		resolve({ extensions }),
		replace({ 'process.env.PACKAGE_NAME': JSON.stringify(pkg.name), preventAssignment: true }),
		babel({ extensions, babelHelpers: 'bundled' }),
	],
	output: [
		{
			file: pkg.module,
			format: 'esm',
		},
	],
})

const tsConfig = defineConfig({
	input,
	plugins: [typescript(), dts()],
	output: {
		file: pkg.types,
		format: 'esm',
	},
})

export default process.env.ROLLUP_WATCH
	? [baseConfig, tsConfig]
	: defineConfig([
			{
				...baseConfig,
				output: [
					...baseConfig.output,
					{
						file: pkg.main,
						format: 'cjs',
					},
					{
						file: pkg.unpkg,
						format: 'umd',
						name: 'LiveChatWidgetCore',
						plugins: [terser()],
					},
				],
			},
			tsConfig,
	  ])
