import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriseRoomComponent } from './add-prise-room.component';

describe('AddPriseRoomComponent', () => {
  let component: AddPriseRoomComponent;
  let fixture: ComponentFixture<AddPriseRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriseRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriseRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
