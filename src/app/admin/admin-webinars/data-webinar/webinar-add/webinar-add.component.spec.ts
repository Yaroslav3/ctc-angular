import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarAddComponent } from './webinar-add.component';

describe('WebinarAddComponent', () => {
  let component: WebinarAddComponent;
  let fixture: ComponentFixture<WebinarAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
