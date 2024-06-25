import { Component, OnInit } from '@angular/core';

import { conexionAzFuncService } from '../../../services/conexionAzFunc.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
//import { YouTubePlayerModule } from "@angularyoutube-player";
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { RouterLink, RouterLinkActive, RouterOutlet , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activity-2',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, RouterOutlet ,
    MatIconModule,MatDividerModule,MatButtonModule,MatGridListModule, 
    FormsModule,CommonModule
  ],
  templateUrl: './activity-2.component.html',
  styleUrl: './activity-2.component.css'
})
export class Activity2Component implements OnInit{

  images: string[] = [];
  emotion: string = '';
  idact: number = 1;



  correctCount: number = 0;
  incorrectCount: number = 0;
  elapsedTime: number = 0;
  correo: string = localStorage.getItem('correo') + '';

  pacientes: any[]=[];
  mensajeEliminado: string='';
  success: boolean=false;
  error: boolean=true;
  mensaje: string='';
  
  emocion: string='';
  act: string='';
  reactivo: string='';
  altaSuccess: boolean =false;
  altaError: boolean =true;
  submitted: boolean= false;
  altaMessage: string='';
  emocion_tit: string = '';



  constructor(private route: ActivatedRoute,private conexionAzFunc:conexionAzFuncService ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const emotion = params.get('emotion');
      const idact = params.get('idact');
      if (emotion) {
        this.emotion = emotion;
        this.loadImages(emotion);
        this.idact = Number(params.get('idact')) || 1;
      }
    });

    if (this.emotion == 'enojo'){
      this.emocion_tit = 'Enojo';
    }
    else if(this.emotion == 'alegria'){
      this.emocion_tit = 'Alegría';
    }
    else if(this.emotion == 'miedo'){
      this.emocion_tit = 'Miedo';
    }
    else if(this.emotion == 'asco'){
      this.emocion_tit = 'Asco';
    }
    else{
      this.emocion_tit = 'Tristeza';
    }
  }

  loadImages(emotion: string) {
    // Ruta base de las imágenes
    const basePath = `../../../../assets/img/Emociones/${emotion}/Act2/`;
    // Suponiendo que tienes 3 imágenes por emoción
    this.images = [
      `${basePath}image1.jpg`,
      `${basePath}image2.jpg`,
      `${basePath}image3.jpg`,
      `${basePath}image4.jpg`,
      `${basePath}image5.jpg`,
      `${basePath}image6.jpg`,
      `${basePath}image7.jpg`,
      `${basePath}image8.jpg`,
      `${basePath}image9.jpg`,
      `${basePath}image10.jpg`
    ];
  }


  guardarEst(){
    console.log(this.correctCount+' '+this.incorrectCount+' '+this.elapsedTime);
    const estadistica = {
      idact:this.idact+'',
      correctas: this.correctCount+'',
      incorrectas: this.incorrectCount+'',
      tiempo: this.elapsedTime+''
    };
    console.log(estadistica)

    this.conexionAzFunc.guardarEstadistica(estadistica)
      .subscribe({
        next: (response) => {
          this.altaSuccess = true;
          this.altaError=true;
          this.altaMessage = response.message;
          this.submitted=false;
        },
        error: (error) => {
          this.altaError=false;
          this.altaSuccess=false;
          console.error('Error al guardas los datos: ', error);
          this.altaMessage = 'Ocurrión un error mientras se guardaban los cambios, intente de nuevo.';
        }
      });

  }
}
