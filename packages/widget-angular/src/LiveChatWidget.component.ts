import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type { ExtendedWindow, WidgetInstance, WidgetConfig } from '@livechat/widget-core'

declare const window: ExtendedWindow

@Component({
	selector: 'livechat-widget',
	template: '',
	styles: [],
})
export class LiveChatWidgetComponent implements OnInit, OnDestroy {
	@Input() license: WidgetConfig['license'] = ''
	@Input() group: WidgetConfig['group']
	widget?: WidgetInstance

	ngOnInit() {
		this.widget = createWidget({ license: this.license, group: this.group })
		window.__lc.integration_name = process.env.PACKAGE_NAME
		this.widget.init()
	}

	ngOnDestroy() {
		this.widget?.destroy()
	}
}
