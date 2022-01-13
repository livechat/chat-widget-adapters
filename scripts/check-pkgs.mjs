async function validateVersion() {
	const mainVersion = require('../lerna.json').version
	const workspaces = require('../package.json').workspaces
	const pkgs = await globby(workspaces.map((w) => `${w}/package.json`))

	const mismatchedVersions = pkgs
		.map((pkgPath) => {
			const pkgVersion = require(`../${pkgPath}`).version
			return [pkgVersion, pkgPath]
		})
		.filter(([version]) => version !== mainVersion)

	if (mismatchedVersions.length > 0) {
		console.log(chalk.red('Some packages have different version than the main version:', mainVersion))
		mismatchedVersions.forEach((version) => {
			console.log(chalk.yellow(version.join(': ')))
		})
		process.exit(1)
	}
}

await validateVersion()
await $`manypkg check`
