import { Component } from '@angular/core';

import { RouterLink,RouterOutlet, RouterLinkActive,Router} from '@angular/router';

@Component({
  selector: 'app-menu-especialista',
  standalone: true,
  imports: [ RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './menu-especialista.component.html',
  styleUrl: './menu-especialista.component.css'
})
export class MenuEspecialistaComponent {

  constructor (private router: Router){}

  cierreSesion(){
    sessionStorage.setItem('inicio', 'false');
    this.router.navigate(['']);
  }

}
