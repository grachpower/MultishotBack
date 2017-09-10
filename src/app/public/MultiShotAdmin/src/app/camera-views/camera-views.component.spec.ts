import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraViewsComponent } from './camera-views.component';

describe('CameraViewsComponent', () => {
  let component: CameraViewsComponent;
  let fixture: ComponentFixture<CameraViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
