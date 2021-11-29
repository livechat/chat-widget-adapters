import { NgModule } from '@angular/core'

import { LiveChatWidgetComponent } from './LiveChatWidget.component'
import { WidgetIsReadyService } from './WidgetIsReady.service'
import { WidgetStateService } from './WidgetState.service'
import { WidgetCustomerDataService } from './WidgetCustomerData.service'
import { WidgetChatDataService } from './WidgetChatData.service'
import { WidgetGreetingService } from './WidgetGreeting.service'

@NgModule({
	imports: [],
	declarations: [LiveChatWidgetComponent],
	exports: [LiveChatWidgetComponent],
	providers: [
		WidgetIsReadyService,
		WidgetStateService,
		WidgetCustomerDataService,
		WidgetChatDataService,
		WidgetGreetingService,
	],
})
export class LiveChatWidgetModule {}
