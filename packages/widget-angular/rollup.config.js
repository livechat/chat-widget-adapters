import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

const extensions = ['.js', '.ts']

const baseConfig = defineConfig({
	input: 'lib/index.js',
	external: ['@angular/core', 'rxjs', '@livechat/widget-core'],
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
	input: 'lib/index.d.ts',
	plugins: [dts()],
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
				],
			},
			tsConfig,
	  ])
