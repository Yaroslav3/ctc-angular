import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderRoomComponent } from './show-order-room.component';

describe('ShowOrderRoomComponent', () => {
  let component: ShowOrderRoomComponent;
  let fixture: ComponentFixture<ShowOrderRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrderRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
