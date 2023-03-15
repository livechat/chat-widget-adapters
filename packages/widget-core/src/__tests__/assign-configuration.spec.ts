import { assignConfiguration } from '../assign-configuration'
import type { ExtendedWindow } from '../types'

declare const window: ExtendedWindow

describe('assignConfiguration', () => {
	beforeEach(() => {
		window.__lc = {} as ExtendedWindow['__lc']
	})
	it('should assign full proper config', () => {
		assignConfiguration({
			license: '123456',
			group: '0',
			chatBetweenGroups: true,
			sessionVariables: {
				foo: 'bar',
				bar: 'baz',
			},
			customIdentityProvider: () => ({
				getToken: () => Promise.resolve(String(Math.random())),
				getFreshToken: () => Promise.resolve(String(Math.random())),
				hasToken: () => Promise.resolve(true),
				invalidate: () => Promise.resolve(),
			}),
		})

		expect(window.__lc).toMatchInlineSnapshot(`
		Object {
		  "chat_between_groups": true,
		  "custom_identity_provider": [Function],
		  "group": 0,
		  "license": 123456,
		  "params": Array [
		    Object {
		      "name": "foo",
		      "value": "bar",
		    },
		    Object {
		      "name": "bar",
		      "value": "baz",
		    },
		  ],
		}
	`)
	})

	it('should allow to pass only license', () => {
		assignConfiguration({ license: '123456' })
		expect(window.__lc).toMatchInlineSnapshot(`
		Object {
		  "license": 123456,
		}
	`)
	})

	it('should throw an error if license is missing', () => {
		expect(() => assignConfiguration({} as any)).toThrow()
	})
})
