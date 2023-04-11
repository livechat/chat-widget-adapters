import { assignConfiguration } from '../assign-configuration'
import type { ExtendedWindow, Token } from '../types'

declare const window: ExtendedWindow

const exampleToken: Token = {
	accessToken: 'dal:HEedfafaSpij3KhwMAY-bA',
	entityId: 'ec3469fc-5f12-4d05-a7a8-48baecd30208',
	expiresIn: 3600,
	tokenType: 'Bearer',
	creationDate: 1593641600,
	licenseId: 15044244,
}

const customIdentityProvider = () => ({
	getToken: () => Promise.resolve(exampleToken),
	getFreshToken: () => Promise.resolve(exampleToken),
	hasToken: () => Promise.resolve(true),
	invalidate: () => Promise.resolve(),
})

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
			customIdentityProvider,
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

		expect(window.__lc.custom_identity_provider).toStrictEqual(customIdentityProvider)
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
