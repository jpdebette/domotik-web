import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DomotikWebTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CommandDetailComponent } from '../../../../../../main/webapp/app/entities/command/command-detail.component';
import { CommandService } from '../../../../../../main/webapp/app/entities/command/command.service';
import { Command } from '../../../../../../main/webapp/app/entities/command/command.model';

describe('Component Tests', () => {

    describe('Command Management Detail Component', () => {
        let comp: CommandDetailComponent;
        let fixture: ComponentFixture<CommandDetailComponent>;
        let service: CommandService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DomotikWebTestModule],
                declarations: [CommandDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CommandService,
                    JhiEventManager
                ]
            }).overrideTemplate(CommandDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommandDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Command(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.command).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
