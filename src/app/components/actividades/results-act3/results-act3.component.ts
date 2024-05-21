import { Component } from '@angular/core';
import { AnswersAct3Service } from '../../../services/answers-act3.service';

@Component({
  selector: 'app-results-act3',
  standalone: true,
  imports: [],
  templateUrl: './results-act3.component.html',
  styleUrl: './results-act3.component.css'
})
export class ResultsAct3Component {
  correctCount: number = 0;
  incorrectCount: number = 0;
  elapsedTime: number = 0;

  constructor(private answerService: AnswersAct3Service) {}

  ngOnInit(): void {
    const answers = this.answerService.getAnswers();
    this.correctCount = answers.filter(answer => answer.correct).length;
    this.incorrectCount = answers.filter(answer => !answer.correct).length;
    this.elapsedTime = this.answerService.getElapsedTime();
  }

}
