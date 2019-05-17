import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogFirstPhotoComponent } from './add-blog-first-photo.component';

describe('AddBlogFirstPhotoComponent', () => {
  let component: AddBlogFirstPhotoComponent;
  let fixture: ComponentFixture<AddBlogFirstPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogFirstPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogFirstPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
