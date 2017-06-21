import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DomotikWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CommandParameterDetailComponent } from '../../../../../../main/webapp/app/entities/command-parameter/command-parameter-detail.component';
import { CommandParameterService } from '../../../../../../main/webapp/app/entities/command-parameter/command-parameter.service';
import { CommandParameter } from '../../../../../../main/webapp/app/entities/command-parameter/command-parameter.model';

describe('Component Tests', () => {

    describe('CommandParameter Management Detail Component', () => {
        let comp: CommandParameterDetailComponent;
        let fixture: ComponentFixture<CommandParameterDetailComponent>;
        let service: CommandParameterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DomotikWebTestModule],
                declarations: [CommandParameterDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CommandParameterService,
                    JhiEventManager
                ]
            }).overrideTemplate(CommandParameterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommandParameterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandParameterService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CommandParameter(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.commandParameter).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
