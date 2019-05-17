import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleTrainingsComponent } from './add-article-trainings.component';

describe('AddArticleTrainingsComponent', () => {
  let component: AddArticleTrainingsComponent;
  let fixture: ComponentFixture<AddArticleTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
