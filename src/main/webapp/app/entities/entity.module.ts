import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DomotikWebBrandModule } from './brand/brand.module';
import { DomotikWebModelModule } from './model/model.module';
import { DomotikWebSmartDeviceModule } from './smart-device/smart-device.module';
import { DomotikWebCommandModule } from './command/command.module';
import { DomotikWebCommandParameterModule } from './command-parameter/command-parameter.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DomotikWebBrandModule,
        DomotikWebModelModule,
        DomotikWebSmartDeviceModule,
        DomotikWebCommandModule,
        DomotikWebCommandParameterModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DomotikWebEntityModule {}
