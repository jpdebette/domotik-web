import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Command } from './command.model';
import { CommandPopupService } from './command-popup.service';
import { CommandService } from './command.service';
import { Model, ModelService } from '../model';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-command-dialog',
    templateUrl: './command-dialog.component.html'
})
export class CommandDialogComponent implements OnInit {

    command: Command;
    authorities: any[];
    isSaving: boolean;

    models: Model[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private commandService: CommandService,
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
        if (this.command.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commandService.update(this.command), false);
        } else {
            this.subscribeToSaveResponse(
                this.commandService.create(this.command), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Command>, isCreated: boolean) {
        result.subscribe((res: Command) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Command, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'domotikWebApp.command.created'
            : 'domotikWebApp.command.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'commandListModification', content: 'OK'});
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
    selector: 'jhi-command-popup',
    template: ''
})
export class CommandPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandPopupService: CommandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.commandPopupService
                    .open(CommandDialogComponent, params['id']);
            } else {
                this.modalRef = this.commandPopupService
                    .open(CommandDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
