import { assignConfiguration } from '../assign-configuration'
import type { ExtendedWindow } from '../types'

declare const window: ExtendedWindow

describe('assignConfiguration', () => {
	it('should assign full proper config', () => {
		assignConfiguration({
			license: '123456',
			group: '0',
			chatBetweenGroups: true,
			sessionVariables: {
				foo: 'bar',
				bar: 'baz',
			},
		})

		expect(window.__lc).toMatchInlineSnapshot(`
		Object {
		  "chat_between_groups": true,
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
		  "chat_between_groups": true,
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

	it('should throw an error if license is missign', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(() => assignConfiguration({} as any)).toThrow()
	})
})
