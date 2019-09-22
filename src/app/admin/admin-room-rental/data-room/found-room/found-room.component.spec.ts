import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundRoomComponent } from './found-room.component';

describe('FoundRoomComponent', () => {
  let component: FoundRoomComponent;
  let fixture: ComponentFixture<FoundRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
