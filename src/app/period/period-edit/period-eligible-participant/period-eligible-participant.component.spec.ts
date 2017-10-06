import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodEligibleParticipantComponent } from './period-eligible-participant.component';

describe('PeriodEligibleParticipantComponent', () => {
  let component: PeriodEligibleParticipantComponent;
  let fixture: ComponentFixture<PeriodEligibleParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodEligibleParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodEligibleParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
