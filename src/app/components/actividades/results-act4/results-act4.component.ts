import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-act4',
  standalone: true,
  imports: [],
  templateUrl: './results-act4.component.html',
  styleUrl: './results-act4.component.css'
})
export class ResultsAct4Component {
  correctCount: number = 0;
  incorrectCount: number = 0;
  elapsedTime: number = 0;
  

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as { incorrectCount: number, correctCount: number, elapsedTime: number };
      this.correctCount = state.correctCount;
      this.incorrectCount = state.incorrectCount;
      this.elapsedTime = state.elapsedTime;
    }
  }

}
