import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTrainingsComponent } from './data-trainings.component';

describe('DataTrainingsComponent', () => {
  let component: DataTrainingsComponent;
  let fixture: ComponentFixture<DataTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
