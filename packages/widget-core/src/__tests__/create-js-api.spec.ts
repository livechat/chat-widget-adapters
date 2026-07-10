import { createJSApi } from '../create-js-api'
import type { ExtendedWindow } from '../types'

declare const window: ExtendedWindow

afterEach(() => {
	document.querySelectorAll('script').forEach((script) => script.remove())
	delete (window as { LiveChatWidget?: unknown }).LiveChatWidget
})

test('createJSApi', () => {
	createJSApi()
	expect(window.LiveChatWidget).toMatchInlineSnapshot(`
		Object {
		  "_h": null,
		  "_q": Array [],
		  "_v": "2.0",
		  "call": [Function],
		  "get": [Function],
		  "init": [Function],
		  "off": [Function],
		  "on": [Function],
		  "once": [Function],
		}
	`)
})

describe('tracking script source', () => {
	it('defaults to the production tracking script when no env is given', () => {
		createJSApi()
		window.LiveChatWidget.init()

		expect(document.querySelector('script')?.src).toBe('https://cdn.livechatinc.com/tracking.js')
	})

	it('loads the production tracking script for env "production"', () => {
		createJSApi('production')
		window.LiveChatWidget.init()

		expect(document.querySelector('script')?.src).toBe('https://cdn.livechatinc.com/tracking.js')
	})

	it('loads the labs tracking script for env "labs"', () => {
		createJSApi('labs')
		window.LiveChatWidget.init()

		expect(document.querySelector('script')?.src).toBe('https://cdn.labs.livechatinc.com/tracking.js')
	})

	it('loads the staging tracking script for env "staging"', () => {
		createJSApi('staging')
		window.LiveChatWidget.init()

		expect(document.querySelector('script')?.src).toBe('https://cdn.staging.livechatinc.com/tracking.js')
	})

	it('falls back to the production tracking script for an unknown env', () => {
		createJSApi('unknown' as never)
		window.LiveChatWidget.init()

		expect(document.querySelector('script')?.src).toBe('https://cdn.livechatinc.com/tracking.js')
	})

	it('loads the new tracking script when reinitialized with a different env', () => {
		// window.LiveChatWidget is only assigned once and never torn down between reinitializations
		// (see the `||` guard in createJSApi), so this reproduces that scenario without the
		// `afterEach` cleanup masking it.
		createJSApi('labs')
		window.LiveChatWidget.init()
		document.querySelectorAll('script').forEach((script) => script.remove())

		createJSApi('staging')
		window.LiveChatWidget.init()

		expect(document.querySelector('script')?.src).toBe('https://cdn.staging.livechatinc.com/tracking.js')
	})
})
