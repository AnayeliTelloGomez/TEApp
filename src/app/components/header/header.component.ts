import { Component } from '@angular/core';
import { AuxCheckComponent } from '../display-mode/aux-check.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AuxCheckComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  theme: string = 'light'; // Por defecto, se establece el tema en auto
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
