import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Brand } from './brand.model';
import { BrandPopupService } from './brand-popup.service';
import { BrandService } from './brand.service';

@Component({
    selector: 'jhi-brand-delete-dialog',
    templateUrl: './brand-delete-dialog.component.html'
})
export class BrandDeleteDialogComponent {

    brand: Brand;

    constructor(
        private brandService: BrandService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.brandService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'brandListModification',
                content: 'Deleted an brand'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('domotikWebApp.brand.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-brand-delete-popup',
    template: ''
})
export class BrandDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private brandPopupService: BrandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.brandPopupService
                .open(BrandDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
