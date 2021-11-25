import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { createWidget } from '@livechat/widget-core'
import type { WidgetInstance, WidgetConfig } from '@livechat/widget-core'

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
		this.widget.init()
	}

	ngOnDestroy() {
		this.widget?.destroy()
	}
}
