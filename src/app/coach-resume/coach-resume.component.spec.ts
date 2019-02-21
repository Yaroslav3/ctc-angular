import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachResumeComponent } from './coach-resume.component';

describe('CoachResumeComponent', () => {
  let component: CoachResumeComponent;
  let fixture: ComponentFixture<CoachResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
