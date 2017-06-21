import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CommandParameterComponent } from './command-parameter.component';
import { CommandParameterDetailComponent } from './command-parameter-detail.component';
import { CommandParameterPopupComponent } from './command-parameter-dialog.component';
import { CommandParameterDeletePopupComponent } from './command-parameter-delete-dialog.component';

import { Principal } from '../../shared';

export const commandParameterRoute: Routes = [
    {
        path: 'command-parameter',
        component: CommandParameterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.commandParameter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'command-parameter/:id',
        component: CommandParameterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.commandParameter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commandParameterPopupRoute: Routes = [
    {
        path: 'command-parameter-new',
        component: CommandParameterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.commandParameter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'command-parameter/:id/edit',
        component: CommandParameterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.commandParameter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'command-parameter/:id/delete',
        component: CommandParameterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.commandParameter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
