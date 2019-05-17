import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormWebinarComponent } from './order-form-webinar.component';

describe('OrderFormWebinarComponent', () => {
  let component: OrderFormWebinarComponent;
  let fixture: ComponentFixture<OrderFormWebinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFormWebinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
