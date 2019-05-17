import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCouchResumeComponent } from './show-couch-resume.component';

describe('ShowCouchResumeComponent', () => {
  let component: ShowCouchResumeComponent;
  let fixture: ComponentFixture<ShowCouchResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCouchResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCouchResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
