import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ResponseWrapper } from '../shared';

import { Order } from './order.model';

import { SmartDevice } from '../entities/smart-device/smart-device.model';
import { SmartDeviceService } from '../entities/smart-device/smart-device.service';

@Component({
    selector: 'jhi-order',
    templateUrl: './order.component.html',
    styleUrls: [
        'order.css'
    ]

})
export class OrderComponent implements OnInit {
    smartDevices: SmartDevice[];
    order: Order;

    constructor(
        private smartDeviceService: SmartDeviceService,
        private alertService: JhiAlertService,
        public activeModal: NgbActiveModal
    ) {
    }

    ngOnInit() {
        this.order = new Order();
        this.smartDeviceService.query().subscribe((res: ResponseWrapper) => {
                this.smartDevices = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackSmartDeviceById(index: number, item: SmartDevice) {
        return item.id;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    send() {
        this.activeModal.dismiss('Order sent');
        console.log('smart device id: ' + this.order.smartDevice.id);
        console.log('command: ' + this.order.text);
    }
}
