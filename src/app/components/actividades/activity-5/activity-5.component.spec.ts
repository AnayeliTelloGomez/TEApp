import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity5Component } from './activity-5.component';

describe('Activity5Component', () => {
  let component: Activity5Component;
  let fixture: ComponentFixture<Activity5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Activity5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Activity5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
