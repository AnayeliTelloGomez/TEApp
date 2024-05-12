import { Component } from '@angular/core';
import { AuxCheckComponent } from '../display-mode/aux-check.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-h-paciente',
  standalone: true,
  imports: [AuxCheckComponent, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './h-paciente.component.html',
  styleUrl: './h-paciente.component.css'
})
export class HPacienteComponent {
  theme: string = ''; // Por defecto, se establece el tema en auto
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
