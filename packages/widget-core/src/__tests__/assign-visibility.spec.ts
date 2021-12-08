import { assignVisibility } from '../assign-visibility'
import { createJSApi } from '../create-js-api'
import type { ExtendedWindow, WidgetState } from '../types'

declare const window: ExtendedWindow

describe('assignVisibility', () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	const visibilityValues: Array<WidgetState['visibility']> = ['hidden', 'maximized', 'minimized']
	const expected: { [key in WidgetState['visibility']]: string } = {
		hidden: 'hide',
		maximized: 'maximize',
		minimized: 'minimize',
	}

	visibilityValues.forEach((visibility) => {
		it(`should handle ${visibility} visibility`, () => {
			createJSApi()
			const spy = jest.spyOn(window.LiveChatWidget, 'call')

			assignVisibility(visibility)
			expect(spy).toBeCalledWith(expected[visibility])
		})
	})
})
