import { Component } from '@angular/core';


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

  private videos: { [key: string]: string } = {
    'enojo': '2I4LOH8Xt-o',
    'alegria': 'hyetfmz3gcM',
    'tristeza': 'lRIMV4TI1yo',
    'miedo': 'WdNMXcIoyIc',
    'asco': 'wcV3ZrxclQY'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.route.paramMap.subscribe(params => {
      const emotion = params.get('emotion');
      if (emotion && this.videos[emotion]) {
        this.emotion = emotion;
        this.videoId = this.videos[emotion];
      }
    });
  }

  finalizar(){
    console.log('finalizar');
  }

}
