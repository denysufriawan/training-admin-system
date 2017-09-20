import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMaintenanceComponent } from './training-maintenance.component';

describe('TrainingMaintenanceComponent', () => {
  let component: TrainingMaintenanceComponent;
  let fixture: ComponentFixture<TrainingMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
