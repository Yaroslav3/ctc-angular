import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleRoomComponent } from './edit-article-room.component';

describe('EditArticleRoomComponent', () => {
  let component: EditArticleRoomComponent;
  let fixture: ComponentFixture<EditArticleRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArticleRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
