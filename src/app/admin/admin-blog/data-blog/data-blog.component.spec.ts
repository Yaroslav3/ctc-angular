import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBlogComponent } from './data-blog.component';

describe('DataBlogComponent', () => {
  let component: DataBlogComponent;
  let fixture: ComponentFixture<DataBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
