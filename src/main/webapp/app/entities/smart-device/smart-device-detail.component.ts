import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { SmartDevice } from './smart-device.model';
import { SmartDeviceService } from './smart-device.service';

@Component({
    selector: 'jhi-smart-device-detail',
    templateUrl: './smart-device-detail.component.html'
})
export class SmartDeviceDetailComponent implements OnInit, OnDestroy {

    smartDevice: SmartDevice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private smartDeviceService: SmartDeviceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSmartDevices();
    }

    load(id) {
        this.smartDeviceService.find(id).subscribe((smartDevice) => {
            this.smartDevice = smartDevice;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSmartDevices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'smartDeviceListModification',
            (response) => this.load(this.smartDevice.id)
        );
    }
}
