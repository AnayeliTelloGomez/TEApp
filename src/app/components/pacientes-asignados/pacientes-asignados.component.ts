import { Component, OnInit} from '@angular/core';
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MenuEspecialistaComponent } from '../menu-especialista/menu-especialista.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pacientes-asignados',
  standalone: true,
  imports: [HPacienteComponent,MenuEspecialistaComponent,CommonModule],
  templateUrl: './pacientes-asignados.component.html',
  styleUrl: './pacientes-asignados.component.css'
})
export class PacientesAsignadosComponent implements OnInit{
  pacientes: any[]=[];
  mensajeEliminado: string='';
  success: boolean=false;
  error: boolean=true;
  mensaje: string='';
  
  constructor(private conexionAzFunc:conexionAzFuncService){ }

  ngOnInit(): void {
    this.pacientesAsignados();
  }

  pacientesAsignados(): void{
    this.conexionAzFunc.pacientesAsignados(localStorage.getItem('correo')+'').subscribe(data => {
      this.pacientes = data;
      console.log(this.pacientes);
    });
  }
    


}
