import { Component } from '@angular/core';

import { RouterLink,RouterOutlet, RouterLinkActive,Router} from '@angular/router';

@Component({
  selector: 'app-menuu-admin',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './menuu-admin.component.html',
  styleUrl: './menuu-admin.component.css'
})
export class MenuuAdminComponent {
  constructor (private router: Router){}

  cierreSesion(){
    localStorage.setItem('inicioAdmin', 'false');
    this.router.navigate(['']);
  }

}
