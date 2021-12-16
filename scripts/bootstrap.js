const isCI = require('is-ci')
const cmd = require('./cmd')

if (isCI) {
	cmd('lerna bootstrap --no-private')
} else {
	cmd('lerna bootstrap')
	cmd('husky install')
}
