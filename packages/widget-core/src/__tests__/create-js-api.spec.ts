import { createJSApi } from '../create-js-api'
import type { ExtendedWindow } from '../types'

declare const window: ExtendedWindow

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
