import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarShowComponent } from './webinar-show.component';

describe('WebinarShowComponent', () => {
  let component: WebinarShowComponent;
  let fixture: ComponentFixture<WebinarShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
