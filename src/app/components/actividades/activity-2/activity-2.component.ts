import { Component, OnInit } from '@angular/core';

import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
//import { YouTubePlayerModule } from "@angularyoutube-player";
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const emotion = params.get('emotion');
      if (emotion) {
        this.emotion = emotion;
        this.loadImages(emotion);
      }
    });
  }

  loadImages(emotion: string) {
    // Ruta base de las imágenes
    const basePath = `/assets/Emociones/${emotion}/Act2/`;
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
}
