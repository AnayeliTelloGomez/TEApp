import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity1Component } from './activity-1.component';

describe('Activity1Component', () => {
  let component: Activity1Component;
  let fixture: ComponentFixture<Activity1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Activity1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Activity1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
