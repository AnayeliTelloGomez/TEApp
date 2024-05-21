import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity2Component } from './activity-2.component';

describe('Activity2Component', () => {
  let component: Activity2Component;
  let fixture: ComponentFixture<Activity2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Activity2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Activity2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
