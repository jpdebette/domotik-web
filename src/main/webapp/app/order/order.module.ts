import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomotikWebSharedModule } from '../shared';
import {
    OrderComponent,
    OrderPopupService,
    OrderService,
} from './';

@NgModule({
    imports: [
        DomotikWebSharedModule
    ],
    declarations: [
        OrderComponent,
    ],
    entryComponents: [
        OrderComponent,
    ],
    providers: [
        OrderService,
        OrderPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebOrderModule {}
