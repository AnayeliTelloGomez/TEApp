import { Component } from '@angular/core';
import {CdkDrag, CdkDropList,CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { RouterLink, RouterLinkActive, RouterOutlet , ActivatedRoute, Router} from '@angular/router';

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
      } else {
        // Manejar el caso donde no se obtienen los parámetros
        this.emotion = 'default';
        this.imageCount = 1;
        this.imagesPath = `../../../../assets/img/Emociones/default/Act4/`;
        this.generateRandomImages();
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

  checkAnswers(): void {
    this.endTime = Date.now();
    const elapsedTime = (this.endTime - this.startTime) / 1000;
    let incorrectCount = 0;
    let correctCount = 0;
  
    // Verificar si hay imágenes restantes en la lista de escena
    if (this.scene.length > 0) {
      incorrectCount += this.scene.length;
    }
  
    // Verificar las respuestas incorrectas en la lista de correctas
    for (const item of this.correct) {
      if (item.startsWith('incorrect')) {
        incorrectCount++;
      } else {
        correctCount++;
      }
    }
  
    // Verificar las respuestas correctas en la lista de incorrectas
    for (const item of this.incorrect) {
      if (item.startsWith('correct')) {
        incorrectCount++;
      } else {
        correctCount++;
      }
    }
  
    // Navegar al componente de resultados con el número de respuestas incorrectas y correctas
    this.router.navigate(['/resultados_act4',this.idact], {
      state: { incorrectCount, correctCount, elapsedTime }
    });
  }
  

}
