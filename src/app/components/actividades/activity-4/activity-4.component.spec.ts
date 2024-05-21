import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity4Component } from './activity-4.component';

describe('Activity4Component', () => {
  let component: Activity4Component;
  let fixture: ComponentFixture<Activity4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Activity4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Activity4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
