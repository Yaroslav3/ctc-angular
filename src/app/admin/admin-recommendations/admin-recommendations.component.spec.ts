import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecommendationsComponent } from './admin-recommendations.component';

describe('AdminRecommendationsComponent', () => {
  let component: AdminRecommendationsComponent;
  let fixture: ComponentFixture<AdminRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
