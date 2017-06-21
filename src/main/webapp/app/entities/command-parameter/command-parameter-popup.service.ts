import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommandParameter } from './command-parameter.model';
import { CommandParameterService } from './command-parameter.service';

@Injectable()
export class CommandParameterPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private commandParameterService: CommandParameterService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.commandParameterService.find(id).subscribe((commandParameter) => {
                this.commandParameterModalRef(component, commandParameter);
            });
        } else {
            return this.commandParameterModalRef(component, new CommandParameter());
        }
    }

    commandParameterModalRef(component: Component, commandParameter: CommandParameter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.commandParameter = commandParameter;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
