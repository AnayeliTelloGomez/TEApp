import { TestBed } from '@angular/core/testing';

import { AnswersAct3Service } from './answers-act3.service';

describe('AnswersAct3Service', () => {
  let service: AnswersAct3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswersAct3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
