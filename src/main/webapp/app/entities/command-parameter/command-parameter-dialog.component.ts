import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommandParameter } from './command-parameter.model';
import { CommandParameterPopupService } from './command-parameter-popup.service';
import { CommandParameterService } from './command-parameter.service';
import { Command, CommandService } from '../command';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-command-parameter-dialog',
    templateUrl: './command-parameter-dialog.component.html'
})
export class CommandParameterDialogComponent implements OnInit {

    commandParameter: CommandParameter;
    authorities: any[];
    isSaving: boolean;

    commands: Command[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private commandParameterService: CommandParameterService,
        private commandService: CommandService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.commandService.query()
            .subscribe((res: ResponseWrapper) => { this.commands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.commandParameter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commandParameterService.update(this.commandParameter), false);
        } else {
            this.subscribeToSaveResponse(
                this.commandParameterService.create(this.commandParameter), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<CommandParameter>, isCreated: boolean) {
        result.subscribe((res: CommandParameter) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CommandParameter, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'domotikWebApp.commandParameter.created'
            : 'domotikWebApp.commandParameter.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'commandParameterListModification', content: 'OK'});
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

    trackCommandById(index: number, item: Command) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-command-parameter-popup',
    template: ''
})
export class CommandParameterPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandParameterPopupService: CommandParameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.commandParameterPopupService
                    .open(CommandParameterDialogComponent, params['id']);
            } else {
                this.modalRef = this.commandParameterPopupService
                    .open(CommandParameterDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
