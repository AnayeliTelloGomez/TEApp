import { Component,OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-2',
  standalone: true,
  imports: [MatIconModule,MatGridListModule,YouTubePlayerModule,MatDividerModule,MatButtonModule,
            CommonModule,FormsModule,
            RouterLink,RouterLinkActive,RouterOutlet,],
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
}

