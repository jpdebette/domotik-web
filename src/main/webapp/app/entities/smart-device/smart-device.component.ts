import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { SmartDevice } from './smart-device.model';
import { SmartDeviceService } from './smart-device.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-smart-device',
    templateUrl: './smart-device.component.html'
})
export class SmartDeviceComponent implements OnInit, OnDestroy {
smartDevices: SmartDevice[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private smartDeviceService: SmartDeviceService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.smartDeviceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.smartDevices = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSmartDevices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SmartDevice) {
        return item.id;
    }
    registerChangeInSmartDevices() {
        this.eventSubscriber = this.eventManager.subscribe('smartDeviceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
