const { execSync } = require('child_process')

module.exports = function cmd(command, options = {}) {
	execSync(command, { stdio: 'inherit', ...options })
}
