import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRentalComponent } from './room-rental.component';

describe('RoomRentalComponent', () => {
  let component: RoomRentalComponent;
  let fixture: ComponentFixture<RoomRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
