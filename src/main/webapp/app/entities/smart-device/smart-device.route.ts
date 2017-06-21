import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SmartDeviceComponent } from './smart-device.component';
import { SmartDeviceDetailComponent } from './smart-device-detail.component';
import { SmartDevicePopupComponent } from './smart-device-dialog.component';
import { SmartDeviceDeletePopupComponent } from './smart-device-delete-dialog.component';

import { Principal } from '../../shared';

export const smartDeviceRoute: Routes = [
    {
        path: 'smart-device',
        component: SmartDeviceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.smartDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'smart-device/:id',
        component: SmartDeviceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.smartDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const smartDevicePopupRoute: Routes = [
    {
        path: 'smart-device-new',
        component: SmartDevicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.smartDevice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'smart-device/:id/edit',
        component: SmartDevicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.smartDevice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'smart-device/:id/delete',
        component: SmartDeviceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.smartDevice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
