import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Command } from './command.model';
import { CommandService } from './command.service';

@Component({
    selector: 'jhi-command-detail',
    templateUrl: './command-detail.component.html'
})
export class CommandDetailComponent implements OnInit, OnDestroy {

    command: Command;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commandService: CommandService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCommands();
    }

    load(id) {
        this.commandService.find(id).subscribe((command) => {
            this.command = command;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCommands() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commandListModification',
            (response) => this.load(this.command.id)
        );
    }
}
