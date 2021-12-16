const { execSync } = require('child_process')

module.exports = function cmd(command) {
	execSync(command, { stdio: 'inherit' })
}
