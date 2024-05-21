import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAct5Component } from './results-act5.component';

describe('ResultsAct5Component', () => {
  let component: ResultsAct5Component;
  let fixture: ComponentFixture<ResultsAct5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsAct5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsAct5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
