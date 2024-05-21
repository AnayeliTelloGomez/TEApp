import { Component } from '@angular/core';
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
  selector: 'app-activity-1',
  standalone: true,
  imports: [MatIconModule,MatGridListModule,YouTubePlayerModule,MatDividerModule,MatButtonModule,
            CommonModule,FormsModule,
            RouterLink,RouterLinkActive,RouterOutlet,],
  templateUrl: './activity-1.component.html',
  styleUrl: './activity-1.component.css'
})
export class Activity1Component {
  emotion: string = '';
  videoId: string = '';

  private videos: { [key: string]: string } = {
    'Enojo': '2I4LOH8Xt-o',
    'Alegria': 'hyetfmz3gcM',
    'Tristeza': 'lRIMV4TI1yo',
    'Miedo': 'WdNMXcIoyIc',
    'Asco': 'wcV3ZrxclQY'
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
}
