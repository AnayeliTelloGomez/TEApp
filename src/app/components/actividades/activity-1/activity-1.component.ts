import { Component } from '@angular/core';

import { conexionAzFuncService } from '../../../services/conexionAzFunc.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { YouTubePlayerModule } from "@angular/youtube-player";
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive, RouterOutlet , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activity-1',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, RouterOutlet ,
    MatIconModule,MatDividerModule,MatButtonModule,MatGridListModule, YouTubePlayerModule, 
    FormsModule,CommonModule
  ],templateUrl: './activity-1.component.html',
  styleUrl: './activity-1.component.css'
})
export class Activity1Component {
  
  emotion: string = '';
  videoId: string = '';
  idact: number=1;

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



  private videos: { [key: string]: string } = {
    'enojo': '2I4LOH8Xt-o',
    'alegria': 'hyetfmz3gcM',
    'tristeza': 'lRIMV4TI1yo',
    'miedo': 'WdNMXcIoyIc',
    'asco': 'wcV3ZrxclQY'
  };

  constructor(private route: ActivatedRoute,private conexionAzFunc:conexionAzFuncService) {}

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    this.correctCount = this.correctCount;
    this.incorrectCount = this.incorrectCount;
    this.elapsedTime = this.elapsedTime;

    this.route.paramMap.subscribe(params => {
      const emotion = params.get('emotion');
      if (emotion && this.videos[emotion]) {
        this.emotion = emotion;
        this.videoId = this.videos[emotion];
        this.idact = Number(params.get('idact')) || 1;
      }
    });
  }

  finalizar(){
    console.log('finalizar');
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
