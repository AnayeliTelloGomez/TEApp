import { Component } from '@angular/core';
import { AuxCheckComponent } from '../display-mode/aux-check.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-h-especialista',
  standalone: true,
  imports: [AuxCheckComponent, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './h-especialista.component.html',
  styleUrl: './h-especialista.component.css'
})
export class HEspecialistaComponent {
  theme: string = 'light'; // Por defecto, se establece el tema en auto
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
