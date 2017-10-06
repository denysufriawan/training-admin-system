import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodScheduleListComponent } from './period-schedule-list.component';

describe('PeriodScheduleListComponent', () => {
  let component: PeriodScheduleListComponent;
  let fixture: ComponentFixture<PeriodScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
