import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoomInfoComponent } from './show-room-info.component';

describe('ShowRoomInfoComponent', () => {
  let component: ShowRoomInfoComponent;
  let fixture: ComponentFixture<ShowRoomInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRoomInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRoomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
