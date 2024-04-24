import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-aux-check',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './aux-check.component.html',
  styleUrl: './aux-check.component.css',
})
export class AuxCheckComponent {
  theme: string = ''; // Por defecto, se establece el tema en auto
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
