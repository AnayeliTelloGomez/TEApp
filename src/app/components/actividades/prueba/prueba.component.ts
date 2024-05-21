import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [
            RouterLink,RouterLinkActive,RouterOutlet,
            CommonModule,FormsModule,
            ],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  repetitionsEnojo: number = 1;
  repetitionsAlegria: number = 1;
  repetitionsTristeza: number = 1;
  repetitionsMiedo: number = 1;
  repetitionsAsco: number = 1;

  repetitionsEnojo4: number = 1;
  repetitionsAlegria4: number = 1;
  repetitionsTristeza4: number = 1;
  repetitionsMiedo4: number = 1;
  repetitionsAsco4: number = 1;
}
