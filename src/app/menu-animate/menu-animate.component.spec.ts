import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAnimateComponent } from './menu-animate.component';

describe('MenuAnimateComponent', () => {
  let component: MenuAnimateComponent;
  let fixture: ComponentFixture<MenuAnimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAnimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
