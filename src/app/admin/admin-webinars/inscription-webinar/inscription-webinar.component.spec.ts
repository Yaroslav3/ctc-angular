import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionWebinarComponent } from './inscription-webinar.component';

describe('InscriptionWebinarComponent', () => {
  let component: InscriptionWebinarComponent;
  let fixture: ComponentFixture<InscriptionWebinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionWebinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
