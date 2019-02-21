import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTrainersComponent } from './data-trainers.component';

describe('DataTrainersComponent', () => {
  let component: DataTrainersComponent;
  let fixture: ComponentFixture<DataTrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
