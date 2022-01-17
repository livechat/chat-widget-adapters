import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
	testDir: '.',
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
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
}
export default config
