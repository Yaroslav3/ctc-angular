import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarOrderDetailsComponent } from './webinar-order-details.component';

describe('WebinarOrderDetailsComponent', () => {
  let component: WebinarOrderDetailsComponent;
  let fixture: ComponentFixture<WebinarOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
