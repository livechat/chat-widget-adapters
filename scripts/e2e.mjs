import isCI from 'is-ci'
import { dirname, resolve } from 'path'

if (isCI) {
	await $`playwright install chromium`
}

if (!fs.existsSync('packages/widget-core/dist')) {
	await $`lerna run build --scope @livechat/widget-core`
}

const pkgs = await glob('packages/*/package.json', { absolute: true, ignore: ['**/widget-core/**'] })
await Promise.all(
	pkgs
		.filter((path) => {
			return !fs.pathExistsSync(resolve(dirname(path), 'dist'))
		})
		.map((path) => {
			return $`lerna run build --scope ${require(path).name}`
		}),
)

await $`playwright test -c ./e2e/playwright.config.ts`
