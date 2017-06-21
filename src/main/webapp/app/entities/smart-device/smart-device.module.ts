import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomotikWebSharedModule } from '../../shared';
import {
    SmartDeviceService,
    SmartDevicePopupService,
    SmartDeviceComponent,
    SmartDeviceDetailComponent,
    SmartDeviceDialogComponent,
    SmartDevicePopupComponent,
    SmartDeviceDeletePopupComponent,
    SmartDeviceDeleteDialogComponent,
    smartDeviceRoute,
    smartDevicePopupRoute,
} from './';

const ENTITY_STATES = [
    ...smartDeviceRoute,
    ...smartDevicePopupRoute,
];

@NgModule({
    imports: [
        DomotikWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SmartDeviceComponent,
        SmartDeviceDetailComponent,
        SmartDeviceDialogComponent,
        SmartDeviceDeleteDialogComponent,
        SmartDevicePopupComponent,
        SmartDeviceDeletePopupComponent,
    ],
    entryComponents: [
        SmartDeviceComponent,
        SmartDeviceDialogComponent,
        SmartDevicePopupComponent,
        SmartDeviceDeleteDialogComponent,
        SmartDeviceDeletePopupComponent,
    ],
    providers: [
        SmartDeviceService,
        SmartDevicePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebSmartDeviceModule {}
