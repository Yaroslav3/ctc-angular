import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingShowComponent } from './training-show.component';

describe('TrainingShowComponent', () => {
  let component: TrainingShowComponent;
  let fixture: ComponentFixture<TrainingShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
