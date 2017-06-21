import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CommandComponent } from './command.component';
import { CommandDetailComponent } from './command-detail.component';
import { CommandPopupComponent } from './command-dialog.component';
import { CommandDeletePopupComponent } from './command-delete-dialog.component';

import { Principal } from '../../shared';

export const commandRoute: Routes = [
    {
        path: 'command',
        component: CommandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.command.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'command/:id',
        component: CommandDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.command.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commandPopupRoute: Routes = [
    {
        path: 'command-new',
        component: CommandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.command.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'command/:id/edit',
        component: CommandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.command.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'command/:id/delete',
        component: CommandDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'domotikWebApp.command.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
