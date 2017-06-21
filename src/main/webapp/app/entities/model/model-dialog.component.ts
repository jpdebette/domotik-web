import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Model } from './model.model';
import { ModelPopupService } from './model-popup.service';
import { ModelService } from './model.service';
import { Brand, BrandService } from '../brand';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-model-dialog',
    templateUrl: './model-dialog.component.html'
})
export class ModelDialogComponent implements OnInit {

    model: Model;
    authorities: any[];
    isSaving: boolean;

    brands: Brand[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private modelService: ModelService,
        private brandService: BrandService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.brandService.query()
            .subscribe((res: ResponseWrapper) => { this.brands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            this.subscribeToSaveResponse(
                this.modelService.update(this.model), false);
        } else {
            this.subscribeToSaveResponse(
                this.modelService.create(this.model), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Model>, isCreated: boolean) {
        result.subscribe((res: Model) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Model, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'domotikWebApp.model.created'
            : 'domotikWebApp.model.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'modelListModification', content: 'OK'});
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

    trackBrandById(index: number, item: Brand) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-model-popup',
    template: ''
})
export class ModelPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelPopupService: ModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.modelPopupService
                    .open(ModelDialogComponent, params['id']);
            } else {
                this.modalRef = this.modelPopupService
                    .open(ModelDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
