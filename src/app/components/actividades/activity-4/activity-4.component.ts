import { Component } from '@angular/core';
import {CdkDrag, CdkDropList,CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { RouterLink, RouterLinkActive, RouterOutlet , ActivatedRoute, Router} from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-activity-4',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, RouterOutlet ,
    MatIconModule,MatDividerModule,MatButtonModule,MatGridListModule, CdkDrag,CdkDropList,
    FormsModule,CommonModule
  ],
  templateUrl: './activity-4.component.html',
  styleUrl: './activity-4.component.css'
})
export class Activity4Component {
  startTime: number = 0;
  endTime: number = 0;
  
  allImages = ['correct1', 'correct2', 'correct3','correct4', 'correct5', 'incorrect1','incorrect2',
  'incorrect3', 'incorrect4', 'incorrect5', 'incorrect6'];
  scene: string[] = []; 
  correct: string[] = [];
  incorrect: string[] = [];

  correctAnswers: string[] = [];
  incorrectAnswers: string[] = [];

  emotion: string = '';  
  imagesPath: string = ''; 
  imageCount: number = 1;
  idact: number = 1;

  sentencesEnojo: string[] = [
    '¿Quién está enojado?'
  ];
  sentencesFelicidad: string[] = [
    '¿Quién está alegre?'
  ];

  sentencesAsco: string[] = [
    '¿Quién siente asco?'
  ];
  
  sentencesMiedo: string[] = [
    '¿Quién tiene miedo?'
  ];
  
  sentencesTristeza: string[] = [
    '¿Quién está triste?'
  ];
  
  selectedSentence: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.startTime = Date.now();
    this.route.paramMap.subscribe(params => {
      const emotionParam = params.get('emotion');
      const countParam = params.get('count');
      this.idact = Number(params.get('idact')) || 1;

      if (emotionParam && countParam) {
        this.emotion = emotionParam;
        this.imageCount = +countParam;
        this.imagesPath = `../../../../assets/img/Emociones/${this.emotion}/Act4/`;
        this.generateRandomImages();
        this.generateCorrectAnswers();
      } else {
        // Manejar el caso donde no se obtienen los parámetros
        this.emotion = 'default';
        this.imageCount = 1;
        this.imagesPath = `../../../../assets/img/Emociones/default/Act4/`;
        this.generateRandomImages();
        this.generateCorrectAnswers();
      }
    });

    this.selectRandomSentence();
  }

  selectRandomSentence(): void {
    if(this.emotion == "enojo"){
      const randomIndex = Math.floor(Math.random() * this.sentencesEnojo.length);
      this.selectedSentence = this.sentencesEnojo[randomIndex];
    } else if(this.emotion =="alegria"){
      const randomIndex = Math.floor(Math.random() * this.sentencesFelicidad.length);
      this.selectedSentence = this.sentencesFelicidad[randomIndex];
    }else if(this.emotion =="asco"){
      const randomIndex = Math.floor(Math.random() * this.sentencesAsco.length);
      this.selectedSentence = this.sentencesAsco[randomIndex];
    }else if(this.emotion =="miedo"){
      const randomIndex = Math.floor(Math.random() * this.sentencesMiedo.length);
      this.selectedSentence = this.sentencesMiedo[randomIndex];
    }else{
      const randomIndex = Math.floor(Math.random() * this.sentencesTristeza.length);
      this.selectedSentence = this.sentencesTristeza[randomIndex];
    }
  }

  generateRandomImages(): void {
    this.scene = [];
    const availableImages = [...this.allImages];

    for (let i = 0; i < this.imageCount; i++) {
      if (availableImages.length === 0) break;  // Evita intentar seleccionar más imágenes de las que hay disponibles
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const selectedImage = availableImages.splice(randomIndex, 1)[0];
      this.scene.push(selectedImage);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // Método para generar las respuestas correctas e incorrectas basadas en las imágenes usadas en la actividad
  generateCorrectAnswers(): void {
    this.correctAnswers = this.scene.filter(image => image.startsWith('correct'));
    this.incorrectAnswers = this.scene.filter(image => image.startsWith('incorrect'));
  }

  // Método para mostrar el modal con las respuestas correctas
  showResults(): void {
    this.endTime = Date.now();
    const modal = new bootstrap.Modal(document.getElementById('ResultsModal'));
    modal.show();
  }

  
  navigateToResults(): void {
    const elapsedTime = (this.endTime - this.startTime) / 1000;
    let incorrectCount = 0;
    let correctCount = 0;
  
    if (this.scene.length > 0) {
      incorrectCount += this.scene.length;
    }
  
    for (const item of this.correct) {
      if (item.startsWith('incorrect')) {
        incorrectCount++;
      } else {
        correctCount++;
      }
    }
  
    for (const item of this.incorrect) {
      if (item.startsWith('correct')) {
        incorrectCount++;
      } else {
        correctCount++;
      }
    }
  
    this.router.navigate(['/resultados_act4', this.idact], {
      state: { incorrectCount, correctCount, elapsedTime }
    });
  }

}
