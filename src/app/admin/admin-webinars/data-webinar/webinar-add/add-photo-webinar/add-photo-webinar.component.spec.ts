import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoWebinarComponent } from './add-photo-webinar.component';

describe('AddPhotoWebinarComponent', () => {
  let component: AddPhotoWebinarComponent;
  let fixture: ComponentFixture<AddPhotoWebinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhotoWebinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotoWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
