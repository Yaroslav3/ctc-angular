import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomRentalComponent } from './admin-room-rental.component';

describe('AdminRoomRentalComponent', () => {
  let component: AdminRoomRentalComponent;
  let fixture: ComponentFixture<AdminRoomRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoomRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoomRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
