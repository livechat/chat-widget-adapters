import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	use: {
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'npm start examples',
		port: 3003,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},
}
export default config
