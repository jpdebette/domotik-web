import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CommandsPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,

    ) {}

    open(component: Component): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
    }
}
