import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleRoomComponent } from './add-article-room.component';

describe('AddArticleRoomComponent', () => {
  let component: AddArticleRoomComponent;
  let fixture: ComponentFixture<AddArticleRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
