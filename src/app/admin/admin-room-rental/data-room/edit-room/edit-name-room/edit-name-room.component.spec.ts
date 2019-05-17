import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNameRoomComponent } from './edit-name-room.component';

describe('EditNameRoomComponent', () => {
  let component: EditNameRoomComponent;
  let fixture: ComponentFixture<EditNameRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNameRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
