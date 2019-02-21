import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsEditComponent } from './trainings-edit.component';

describe('TrainingsEditComponent', () => {
  let component: TrainingsEditComponent;
  let fixture: ComponentFixture<TrainingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
