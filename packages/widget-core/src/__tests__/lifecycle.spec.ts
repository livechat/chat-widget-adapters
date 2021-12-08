import { createJSApi } from '../create-js-api'

describe('lifecycle', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const mockMitt = {
		emit: jest.fn(),
		on: jest.fn(),
		once: jest.fn(),
		off: jest.fn(),
	}
	jest.mock('mitt', () => () => mockMitt)
	const { lcOnInit, lcOnDestroy } = require('../lifecycle')

	it('should handle lcOnInit callback', () => {
		const initHandler = jest.fn()
		const unsubscribeInit = lcOnInit(initHandler)

		expect(initHandler).not.toBeCalled()
		expect(mockMitt.on).toBeCalledWith('init', initHandler)
		expect(mockMitt.off).not.toBeCalled()

		unsubscribeInit()
		expect(mockMitt.off).toBeCalledWith('init', initHandler)

		jest.clearAllMocks()

		createJSApi()
		lcOnInit(initHandler)

		expect(initHandler).toBeCalled()
		expect(mockMitt.on).toBeCalledWith('init', initHandler)
		expect(mockMitt.off).not.toBeCalled()
	})

	it('should handle lcOnDestroy callback', () => {
		const destroyHandler = jest.fn()
		const unsubscribeDestroy = lcOnDestroy(destroyHandler)

		expect(mockMitt.on).toBeCalledWith('destroy', destroyHandler)
		expect(mockMitt.off).not.toBeCalled()

		unsubscribeDestroy()
		expect(mockMitt.off).toBeCalledWith('destroy', destroyHandler)
	})
})
