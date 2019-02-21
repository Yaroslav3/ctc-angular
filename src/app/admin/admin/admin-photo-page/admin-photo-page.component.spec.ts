import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPhotoPageComponent } from './admin-photo-page.component';

describe('AdminPhotoPageComponent', () => {
  let component: AdminPhotoPageComponent;
  let fixture: ComponentFixture<AdminPhotoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPhotoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPhotoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
