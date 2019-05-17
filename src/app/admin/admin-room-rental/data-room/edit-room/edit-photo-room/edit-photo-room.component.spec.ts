import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotoRoomComponent } from './edit-photo-room.component';

describe('EditPhotoRoomComponent', () => {
  let component: EditPhotoRoomComponent;
  let fixture: ComponentFixture<EditPhotoRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhotoRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
