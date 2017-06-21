import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SmartDevice } from './smart-device.model';
import { SmartDevicePopupService } from './smart-device-popup.service';
import { SmartDeviceService } from './smart-device.service';
import { Model, ModelService } from '../model';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-smart-device-dialog',
    templateUrl: './smart-device-dialog.component.html'
})
export class SmartDeviceDialogComponent implements OnInit {

    smartDevice: SmartDevice;
    authorities: any[];
    isSaving: boolean;

    models: Model[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private smartDeviceService: SmartDeviceService,
        private modelService: ModelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.modelService.query()
            .subscribe((res: ResponseWrapper) => { this.models = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.smartDevice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.smartDeviceService.update(this.smartDevice), false);
        } else {
            this.subscribeToSaveResponse(
                this.smartDeviceService.create(this.smartDevice), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<SmartDevice>, isCreated: boolean) {
        result.subscribe((res: SmartDevice) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SmartDevice, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'domotikWebApp.smartDevice.created'
            : 'domotikWebApp.smartDevice.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'smartDeviceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackModelById(index: number, item: Model) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-smart-device-popup',
    template: ''
})
export class SmartDevicePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private smartDevicePopupService: SmartDevicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.smartDevicePopupService
                    .open(SmartDeviceDialogComponent, params['id']);
            } else {
                this.modalRef = this.smartDevicePopupService
                    .open(SmartDeviceDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
