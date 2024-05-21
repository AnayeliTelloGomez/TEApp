import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAct3Component } from './results-act3.component';

describe('ResultsAct3Component', () => {
  let component: ResultsAct3Component;
  let fixture: ComponentFixture<ResultsAct3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsAct3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsAct3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
