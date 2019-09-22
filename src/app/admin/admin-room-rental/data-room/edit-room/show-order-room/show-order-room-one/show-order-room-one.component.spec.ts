import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderRoomOneComponent } from './show-order-room-one.component';

describe('ShowOrderRoomOneComponent', () => {
  let component: ShowOrderRoomOneComponent;
  let fixture: ComponentFixture<ShowOrderRoomOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrderRoomOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderRoomOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
