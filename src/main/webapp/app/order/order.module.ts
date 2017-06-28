import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomotikWebSharedModule } from '../shared';
import {
    OrderComponent,
    OrderPopupService,
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
        OrderPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebOrderModule {}
