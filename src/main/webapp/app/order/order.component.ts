import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';

import { ResponseWrapper } from '../shared';

import { Order } from './order.model';
import { OrderService } from './order.service';

import { SmartDevice } from '../entities/smart-device/smart-device.model';
import { SmartDeviceService } from '../entities/smart-device/smart-device.service';

import { Command } from '../entities/command/command.model';
import { CommandService } from '../entities/command/command.service';

@Component({
    selector: 'jhi-order',
    templateUrl: './order.component.html',
    styleUrls: [
        'order.css'
    ]
})
export class OrderComponent implements OnInit {
    smartDevices: SmartDevice[];
    commands: Command[];
    order: Order;
    isSending: boolean;
    result: string;

    constructor(
        private smartDeviceService: SmartDeviceService,
        private commandService: CommandService,
        private alertService: JhiAlertService,
        private orderService: OrderService,
        public activeModal: NgbActiveModal
    ) {
    }

    ngOnInit() {
        this.isSending = false;
        this.order = new Order();
        this.result = '';
        this.smartDeviceService.query().subscribe((res: ResponseWrapper) => {
                this.smartDevices = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.commandService.query().subscribe((res: ResponseWrapper) => {
                this.commands = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    trackSmartDeviceById(index: number, item: SmartDevice) {
        return item.id;
    }

    trackCommandById(index: number, item: Command) {
        return item.id;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    send() {
        this.result = '';
        this.isSending = true;
        this.subscribeToSendResponse(this.orderService.send(this.order));
    }

    private subscribeToSendResponse(result: Observable<string>) {
        result.subscribe((res: string) =>
            this.onSendSuccess(res), (res: Response) => this.onSendError(res));
    }

    private onSendSuccess(result: string) {
        this.alertService.success('order.sent', null, null);
        this.result = result;
        this.isSending = false;
    }

    private onSendError(error) {
        try {
            error.json();
        } catch (exception) {
            this.onError(error);
        }
        this.isSending = false;
        this.result = error;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
