import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceRoomComponent } from './edit-price-room.component';

describe('EditPriceRoomComponent', () => {
  let component: EditPriceRoomComponent;
  let fixture: ComponentFixture<EditPriceRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPriceRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPriceRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
