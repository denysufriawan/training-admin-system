import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCreateComponent } from './period-create.component';

describe('PeriodAddComponent', () => {
  let component: PeriodCreateComponent;
  let fixture: ComponentFixture<PeriodCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
