import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
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
