import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResponseWrapper } from '../shared';
import { CommandsPopupService } from './commands-popup.service';

import { SmartDevice } from '../entities/smart-device/smart-device.model';
import { SmartDeviceService } from '../entities/smart-device/smart-device.service';

@Component({
    selector: 'jhi-commands',
    templateUrl: './commands.component.html',
    styleUrls: [
        'commands.css'
    ]

})
export class CommandsComponent implements OnInit {
    smartDevices: SmartDevice[];
    command: String;

    constructor(
        private smartDeviceService: SmartDeviceService,
        private alertService: JhiAlertService
    ) {
    }

    ngOnInit() {
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

    send() {

    }
}

@Component({
    selector: 'jhi-commands-popup',
    template: ''
})
export class CommandsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandsPopupService: CommandsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.commandsPopupService
                .open(CommandsComponent);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
