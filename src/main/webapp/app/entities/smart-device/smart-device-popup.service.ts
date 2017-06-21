import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SmartDevice } from './smart-device.model';
import { SmartDeviceService } from './smart-device.service';

@Injectable()
export class SmartDevicePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private smartDeviceService: SmartDeviceService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.smartDeviceService.find(id).subscribe((smartDevice) => {
                this.smartDeviceModalRef(component, smartDevice);
            });
        } else {
            return this.smartDeviceModalRef(component, new SmartDevice());
        }
    }

    smartDeviceModalRef(component: Component, smartDevice: SmartDevice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.smartDevice = smartDevice;
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
