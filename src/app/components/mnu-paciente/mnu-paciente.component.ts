import { Component, OnInit } from '@angular/core';
//mover entre los componentes a traves de las rutas definidas con  approutes
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';

//providers
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';

@Component({
  selector: 'app-mnu-paciente',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './mnu-paciente.component.html',
  styleUrl: './mnu-paciente.component.css',
  providers: [InicioSesionComponent, ]
})
export class MnuPacienteComponent implements OnInit{
  actividades: any[]=[];
  idPaciente: number = 1;
  constructor (private router: Router, private conexionAzFunc: conexionAzFuncService) {  }
  
  cierreSesion(){
    localStorage.setItem('inicio', 'false');
    this.router.navigate(['']);
  }


  ngOnInit(): void {
    this.estadisticasPacientes();
  }

  estadisticasPacientes(): void{
    this.conexionAzFunc.despliegueActividades(localStorage.getItem('correo')+'').subscribe(data => {
      this.actividades = data;
      console.log(this.actividades);
      // Extraer el id del paciente (suponiendo que está en todas las actividades)
      if (this.actividades && this.actividades.length > 0) {
        this.idPaciente = this.actividades[0].idpaciente;
      }
    });
  }

}
