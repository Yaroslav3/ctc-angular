import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWebinarsComponent } from './data-webinars.component';

describe('DataWebinarsComponent', () => {
  let component: DataWebinarsComponent;
  let fixture: ComponentFixture<DataWebinarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataWebinarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataWebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
