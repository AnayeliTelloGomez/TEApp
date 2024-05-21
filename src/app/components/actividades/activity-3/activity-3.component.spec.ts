import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity3Component } from './activity-3.component';

describe('Activity3Component', () => {
  let component: Activity3Component;
  let fixture: ComponentFixture<Activity3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Activity3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Activity3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
