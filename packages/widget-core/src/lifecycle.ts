import mitt from 'mitt'

type LifecycleEvents = {
	init: undefined
	destroy: undefined
}

const emitter = mitt<LifecycleEvents>()

export const lifecycleEmit = emitter.emit.bind(null)

export function lcOnInit(callback: VoidFunction): VoidFunction {
	emitter.on('init', callback)
	if ('LiveChatWidget' in window) {
		callback()
	}
	return () => {
		emitter.off('init', callback)
	}
}

export function lcOnDestroy(callback: VoidFunction): VoidFunction {
	emitter.on('destroy', callback)
	return () => {
		emitter.off('destroy', callback)
	}
}
