import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DomotikWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SmartDeviceDetailComponent } from '../../../../../../main/webapp/app/entities/smart-device/smart-device-detail.component';
import { SmartDeviceService } from '../../../../../../main/webapp/app/entities/smart-device/smart-device.service';
import { SmartDevice } from '../../../../../../main/webapp/app/entities/smart-device/smart-device.model';

describe('Component Tests', () => {

    describe('SmartDevice Management Detail Component', () => {
        let comp: SmartDeviceDetailComponent;
        let fixture: ComponentFixture<SmartDeviceDetailComponent>;
        let service: SmartDeviceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DomotikWebTestModule],
                declarations: [SmartDeviceDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SmartDeviceService,
                    JhiEventManager
                ]
            }).overrideTemplate(SmartDeviceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SmartDeviceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SmartDeviceService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SmartDevice(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.smartDevice).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
