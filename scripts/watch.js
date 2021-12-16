const fs = require('fs')
const cmd = require('./cmd')
const target = process.argv[2] || 'packages'

function ensureCorePackageIsBuilt() {
	if (fs.existsSync('packages/widget-core/dist')) {
		return
	}
	cmd('lerna run build --scope @livechat/widget-core')
}

switch (target) {
	case 'packages':
		ensureCorePackageIsBuilt()
		cmd('lerna run start --parallel --scope @livechat/widget-*')
		return

	case 'examples':
		cmd('lerna run start --parallel --scope *-example')
		return

	case 'core':
		cmd('lerna run start --scope @livechat/widget-core')
		return

	case 'vue':
	case 'react':
	case 'angular':
		ensureCorePackageIsBuilt()
		cmd(`lerna run start --parallel --scope '{@livechat/widget-${target},${target}-example}'`)
		return

	default:
		console.error("Unsuported target '%s' provided", target)
		process.exit(1)
		return
}
