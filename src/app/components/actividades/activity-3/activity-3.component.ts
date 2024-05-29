import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AnswersAct3Service } from '../../../services/answers-act3.service';

@Component({
  selector: 'app-activity-3',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, RouterOutlet ,
    MatIconModule,MatDividerModule,MatButtonModule,MatGridListModule, 
    FormsModule,CommonModule
  ],
  templateUrl: './activity-3.component.html',
  styleUrl: './activity-3.component.css'
})
export class Activity3Component {
  images: string[] = ['correct1.png', 'correct2.png', 'correct3.png','incorrect1.png', 'incorrect2.png', 'incorrect3.png',
  'incorrect4.png', 'incorrect5.png', 'incorrect6.png','incorrect7.png', 'incorrect8.png', 'incorrect9.png',
  'incorrect10.png', 'incorrect11.png', 'incorrect12.png','incorrect13.png', 'incorrect14.png'];
  correctAnswers: string[] = [];
  incorrectAnswers: string[] = [];

  repetitions: number = 1;
  currentRepetition: number = 1;
  emotion: string = '';
  currentImages: string[] = [];
  usedPairs: Set<string> = new Set();
  idact: number = 1;


  constructor(private route: ActivatedRoute, private router: Router, private answerService: AnswersAct3Service) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.emotion = params.get('emotion') || 'Enojo';
      this.repetitions = Number(params.get('repetitions')) || 1;
      this.idact = Number(params.get('idact')) || 1;
      console.log(this.idact);
      this.setNewImages();

      if (this.currentRepetition === 1) {
        this.answerService.startTimer();
      }
    });
  }


  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getCorrectAndIncorrectImages(): string[] {
    const correctImages = this.images.filter(image => image.startsWith('correct'));
    const incorrectImages = this.images.filter(image => image.startsWith('incorrect'));

    const shuffledCorrectImages = this.shuffleArray([...correctImages]);
    const shuffledIncorrectImages = this.shuffleArray([...incorrectImages]);

    for (let correctImage of shuffledCorrectImages) {
      for (let incorrectImage of shuffledIncorrectImages) {
        const pairKey1 = `${correctImage}-${incorrectImage}`;
        const pairKey2 = `${incorrectImage}-${correctImage}`;

        if (!this.usedPairs.has(pairKey1) && !this.usedPairs.has(pairKey2)) {
          this.usedPairs.add(pairKey1);
          this.usedPairs.add(pairKey2);

          return Math.random() > 0.5 ? [correctImage, incorrectImage] : [incorrectImage, correctImage];
        }
      }
    }

    // En caso de que se hayan agotado todas las combinaciones, limpiar y empezar de nuevo
    this.usedPairs.clear();
    return this.getCorrectAndIncorrectImages();
  }


  setNewImages(): void {
    this.currentImages = this.getCorrectAndIncorrectImages();
  }


  onButtonClick(selectedImage: string) {
    const isCorrect = selectedImage.startsWith('correct');
    this.answerService.addAnswer(isCorrect, selectedImage);

    if (this.currentRepetition < this.repetitions) {
      this.currentRepetition++;
      this.setNewImages();
    } else {
      this.router.navigate(['/resultados_act3', this.idact]);
    }
  }


  getImagePath(imageName: string): string {
    return `../../../../assets/img/Emociones/${this.emotion}/Act3/${imageName}`;
  }


}
