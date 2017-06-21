import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { CommandParameter } from './command-parameter.model';
import { CommandParameterService } from './command-parameter.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-command-parameter',
    templateUrl: './command-parameter.component.html'
})
export class CommandParameterComponent implements OnInit, OnDestroy {
commandParameters: CommandParameter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private commandParameterService: CommandParameterService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.commandParameterService.query().subscribe(
            (res: ResponseWrapper) => {
                this.commandParameters = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCommandParameters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CommandParameter) {
        return item.id;
    }
    registerChangeInCommandParameters() {
        this.eventSubscriber = this.eventManager.subscribe('commandParameterListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
