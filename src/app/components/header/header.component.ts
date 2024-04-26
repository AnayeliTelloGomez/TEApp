import { Component } from '@angular/core';
import { AuxCheckComponent } from '../display-mode/aux-check.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AuxCheckComponent, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  theme: string = 'light'; // Por defecto, se establece el tema en auto
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  onInicio(){

  }
}
