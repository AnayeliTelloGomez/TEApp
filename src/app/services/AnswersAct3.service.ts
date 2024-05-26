import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswersAct3Service {
  private answers: { correct: boolean, imageName: string }[] = [];
  private startTime: Date | null = null;

  startTimer(): void {
    this.startTime = new Date();
  }

  getElapsedTime(): number {
    if (!this.startTime) {
      return 0;
    }
    const endTime = new Date();
    return (endTime.getTime() - this.startTime.getTime()) / 1000; // Retorna el tiempo en segundos
  }

  addAnswer(isCorrect: boolean, imageName: string): void {
    this.answers.push({ correct: isCorrect, imageName });
  }

  getAnswers(): { correct: boolean, imageName: string }[] {
    return this.answers;
  }

  clearAnswers(): void {
    this.answers = [];
    this.startTime = null;
  }
}
