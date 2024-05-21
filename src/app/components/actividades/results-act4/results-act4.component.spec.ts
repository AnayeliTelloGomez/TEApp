import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAct4Component } from './results-act4.component';

describe('ResultsAct4Component', () => {
  let component: ResultsAct4Component;
  let fixture: ComponentFixture<ResultsAct4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsAct4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsAct4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
