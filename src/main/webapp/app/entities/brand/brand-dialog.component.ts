import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Brand } from './brand.model';
import { BrandPopupService } from './brand-popup.service';
import { BrandService } from './brand.service';

@Component({
    selector: 'jhi-brand-dialog',
    templateUrl: './brand-dialog.component.html'
})
export class BrandDialogComponent implements OnInit {

    brand: Brand;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private brandService: BrandService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.brand.id !== undefined) {
            this.subscribeToSaveResponse(
                this.brandService.update(this.brand), false);
        } else {
            this.subscribeToSaveResponse(
                this.brandService.create(this.brand), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Brand>, isCreated: boolean) {
        result.subscribe((res: Brand) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Brand, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'domotikWebApp.brand.created'
            : 'domotikWebApp.brand.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'brandListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-brand-popup',
    template: ''
})
export class BrandPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private brandPopupService: BrandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.brandPopupService
                    .open(BrandDialogComponent, params['id']);
            } else {
                this.modalRef = this.brandPopupService
                    .open(BrandDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
