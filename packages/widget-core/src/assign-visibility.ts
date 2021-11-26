import type { ExtendedWindow, WidgetState } from './types'

declare const window: ExtendedWindow

export function assignVisibility(visibility?: WidgetState['visibility']): void {
	if (visibility === 'hidden') {
		window.LiveChatWidget.call('hide')
	}
	if (visibility === 'maximized') {
		window.LiveChatWidget.call('maximize')
	}
	if (visibility === 'minimized') {
		window.LiveChatWidget.call('minimize')
	}
}
