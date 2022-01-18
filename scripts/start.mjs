async function ensureCorePackageIsBuilt() {
	if (fs.existsSync('packages/widget-core/dist')) {
		return
	}

	await $`lerna run build --scope @livechat/widget-core`
}

const target = process.argv[3] || 'packages'

switch (target) {
	case 'packages':
		await ensureCorePackageIsBuilt()
		await $`lerna run start --parallel --scope @livechat/widget-*`
		break

	case 'examples':
		await $`lerna run start --parallel --scope *-example`
		break

	case 'core':
		await $`lerna run start --scope @livechat/widget-core`
		break

	case 'vue':
	case 'react':
	case 'angular':
		await ensureCorePackageIsBuilt()
		await $`lerna run start --parallel --scope '{@livechat/widget-${target},${target}-example}'`
		break

	case 'umd':
		await $`npx serve .`

	default:
		console.error("Unsuported target '%s' provided", target)
		process.exit(1)
}
