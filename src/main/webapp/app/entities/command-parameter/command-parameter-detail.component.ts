import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { CommandParameter } from './command-parameter.model';
import { CommandParameterService } from './command-parameter.service';

@Component({
    selector: 'jhi-command-parameter-detail',
    templateUrl: './command-parameter-detail.component.html'
})
export class CommandParameterDetailComponent implements OnInit, OnDestroy {

    commandParameter: CommandParameter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commandParameterService: CommandParameterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCommandParameters();
    }

    load(id) {
        this.commandParameterService.find(id).subscribe((commandParameter) => {
            this.commandParameter = commandParameter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCommandParameters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commandParameterListModification',
            (response) => this.load(this.commandParameter.id)
        );
    }
}
