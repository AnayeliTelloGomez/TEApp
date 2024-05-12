import { Component } from '@angular/core';
//mover entre los componentes a traves de las rutas definidas con  approutes
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';

//providers
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';

@Component({
  selector: 'app-mnu-paciente',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './mnu-paciente.component.html',
  styleUrl: './mnu-paciente.component.css',
  providers: [InicioSesionComponent, ]
})
export class MnuPacienteComponent {
  constructor (private InicioSesionComponent: InicioSesionComponent, private router: Router) {  }
  closeSesion: boolean=false;
  cierreSesion(){
    if(!this.closeSesion){
      sessionStorage.setItem('inicio', 'false');
      this.router.navigate(['']);
    }
      
  }
}
