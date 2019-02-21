import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsAddComponent } from './trainings-add.component';

describe('TrainingsAddComponent', () => {
  let component: TrainingsAddComponent;
  let fixture: ComponentFixture<TrainingsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
