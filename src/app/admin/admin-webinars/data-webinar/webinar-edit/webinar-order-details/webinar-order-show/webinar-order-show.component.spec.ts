import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarOrderShowComponent } from './webinar-order-show.component';

describe('WebinarOrderShowComponent', () => {
  let component: WebinarOrderShowComponent;
  let fixture: ComponentFixture<WebinarOrderShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarOrderShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarOrderShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
