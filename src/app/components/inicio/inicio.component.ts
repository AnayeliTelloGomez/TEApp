import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterOutlet],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
}
