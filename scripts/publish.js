const isCI = require('is-ci')
const cmd = require('./cmd')

if (isCI) {
	cmd('run-p lint test build')
	cmd('lerna publish from-git --yes')
} else {
	console.error('Publish script should be run only on CI')
	process.exit(1)
}
