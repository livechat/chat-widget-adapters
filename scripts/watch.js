const cmd = require('./cmd')

const target = process.argv[2]

if (target === 'packages') {
	cmd('npm run build', { cwd: './packages/widget-core' })
	cmd('lerna run start --parallel --scope @livechat/widget-*')
}

if (target === 'examples') {
	cmd('lerna run start --parallel --scope *-example')
}
