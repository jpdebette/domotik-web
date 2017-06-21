import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Model } from './model.model';
import { ModelPopupService } from './model-popup.service';
import { ModelService } from './model.service';

@Component({
    selector: 'jhi-model-delete-dialog',
    templateUrl: './model-delete-dialog.component.html'
})
export class ModelDeleteDialogComponent {

    model: Model;

    constructor(
        private modelService: ModelService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'modelListModification',
                content: 'Deleted an model'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('domotikWebApp.model.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-model-delete-popup',
    template: ''
})
export class ModelDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelPopupService: ModelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.modelPopupService
                .open(ModelDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
