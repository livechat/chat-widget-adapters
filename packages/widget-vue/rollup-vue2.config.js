import fs from 'fs'
import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

import mainPkg from './package.json'

const extensions = ['.ts']
const pkg = {
	main: 'LiveChatWidget.cjs.js',
	module: 'LiveChatWidget.esm.js',
	unpkg: 'LiveChatWidget.umd.js',
}

/**
 * Babel plugin
 *  1. Removes `defineComponent` import declarations:
 *    a. `import { defineComponent } from 'vue'` => no import
 *    b. `import Vue, { defineComponent } from 'vue'` => `import Vue from 'vue'`
 *    c. `import { defineComponent, createApp } from 'vue'` => `import { createApp } from 'vue'`
 *
 *  3. Replaces `defineComponent` call with its first argument, for example:
 *    a. `defineComponent({ template: '', props: {} })` => `{ template: '', props: {} }`
 *    b. `export const Component = defineComponent({})` => `export const Component = {}`
 */
function removeVueDefineComponentCall() {
	return {
		visitor: {
			Program(path) {
				path.setData('calleeName', [])
				path.traverse({
					ImportDeclaration(_path) {
						if (_path.get('importKind').node !== 'value' || _path.get('source.value').node !== 'vue') {
							return
						}

						_path.setData('newSpecifiers', [])
						_path.traverse({
							'ImportSpecifier|ImportDefaultSpecifier'(__path) {
								if (__path.get('imported.name').node === 'defineComponent') {
									path.setData('calleeName', path.getData('calleeName').concat(__path.get('local.name').node))
								} else {
									_path.setData('newSpecifiers', _path.getData('newSpecifiers').concat(__path.node))
								}
							},
						})

						if (_path.getData('newSpecifiers').length === 0) {
							_path.remove()
						} else {
							_path.set('specifiers', _path.getData('newSpecifiers'))
						}
					},
					CallExpression(_path) {
						if (path.getData('calleeName').includes(_path.get('callee.name').node)) {
							_path.replaceWith(_path.get('arguments.0').node)
						}
					},
				})
			},
		},
	}
}

/**
 * Rollup plugin
 *  1. Makes new 'v2' directory where build outputs will be stored
 *  2. Adds 'package.json' pointing to apropriate build output formats
 */
function makePkgJSON() {
	return {
		buildEnd() {
			fs.mkdirSync('v2')
			fs.writeFileSync('v2/package.json', JSON.stringify(pkg, null, 2))
		},
	}
}

export default defineConfig({
	input: 'src/LiveChatWidget.ts',
	external: ['vue', '@livechat/widget-core'],
	plugins: [
		resolve({ extensions }),
		replace({ 'process.env.PACKAGE_NAME': JSON.stringify(`${String(mainPkg.name)}/v2`), preventAssignment: true }),
		babel({ extensions, babelHelpers: 'bundled', plugins: [removeVueDefineComponentCall] }),
		makePkgJSON(),
	],
	output: [
		{
			file: `v2/${pkg.module}`,
			format: 'esm',
		},
		{
			file: `v2/${pkg.main}`,
			format: 'cjs',
		},
		{
			file: `v2/${pkg.unpkg}`,
			format: 'umd',
			name: 'LiveChatWidgetVue',
			plugins: [terser()],
			globals: {
				vue: 'Vue',
				'@livechat/widget-core': 'LiveChatWidgetCore',
			},
		},
	],
})
