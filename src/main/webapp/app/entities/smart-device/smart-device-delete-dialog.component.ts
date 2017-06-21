import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { SmartDevice } from './smart-device.model';
import { SmartDevicePopupService } from './smart-device-popup.service';
import { SmartDeviceService } from './smart-device.service';

@Component({
    selector: 'jhi-smart-device-delete-dialog',
    templateUrl: './smart-device-delete-dialog.component.html'
})
export class SmartDeviceDeleteDialogComponent {

    smartDevice: SmartDevice;

    constructor(
        private smartDeviceService: SmartDeviceService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.smartDeviceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'smartDeviceListModification',
                content: 'Deleted an smartDevice'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('domotikWebApp.smartDevice.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-smart-device-delete-popup',
    template: ''
})
export class SmartDeviceDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private smartDevicePopupService: SmartDevicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.smartDevicePopupService
                .open(SmartDeviceDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
