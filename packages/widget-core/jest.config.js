/**
 * @type import('@jest/types').Config.InitialOptions
 */
module.exports = {
	rootDir: 'src',
	testEnvironment: 'jsdom',
	transform: {
		'.': '@swc/jest',
	},
}
