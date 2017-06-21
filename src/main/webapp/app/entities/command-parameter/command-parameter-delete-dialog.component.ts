import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { CommandParameter } from './command-parameter.model';
import { CommandParameterPopupService } from './command-parameter-popup.service';
import { CommandParameterService } from './command-parameter.service';

@Component({
    selector: 'jhi-command-parameter-delete-dialog',
    templateUrl: './command-parameter-delete-dialog.component.html'
})
export class CommandParameterDeleteDialogComponent {

    commandParameter: CommandParameter;

    constructor(
        private commandParameterService: CommandParameterService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commandParameterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commandParameterListModification',
                content: 'Deleted an commandParameter'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('domotikWebApp.commandParameter.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-command-parameter-delete-popup',
    template: ''
})
export class CommandParameterDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandParameterPopupService: CommandParameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.commandParameterPopupService
                .open(CommandParameterDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
