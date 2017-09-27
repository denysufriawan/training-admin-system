import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodEditDataComponent } from './period-edit-data.component';

describe('PeriodEditDataComponent', () => {
  let component: PeriodEditDataComponent;
  let fixture: ComponentFixture<PeriodEditDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodEditDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
