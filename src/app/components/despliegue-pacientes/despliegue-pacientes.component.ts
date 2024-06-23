import { Component, OnInit} from '@angular/core';
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
import { CommonModule } from '@angular/common';

import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MenuEspecialistaComponent } from '../menu-especialista/menu-especialista.component';


@Component({
  selector: 'app-despliegue-pacientes',
  standalone: true,
  imports: [HPacienteComponent,MenuEspecialistaComponent,CommonModule],
  templateUrl: './despliegue-pacientes.component.html',
  styleUrl: './despliegue-pacientes.component.css'
})
export class DesplieguePacientesComponent implements OnInit{
  pacientes: any[]=[];
  mensajeEliminado: string='';
  success: boolean=false;
  error: boolean=true;
  mensaje: string='';
  
  constructor(private conexionAzFunc:conexionAzFuncService){ }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes(): void{
    this.conexionAzFunc.desplieguePacientes(localStorage.getItem('correo')+'').subscribe(data => {
      this.pacientes = data;
      console.log(this.pacientes);
    });
  }
    
  validarPaciente(correo: string, idEsp: string){
    console.log(correo);
    this.conexionAzFunc.validarPaciente(correo,localStorage.getItem('correo')+'').subscribe({
      next:(response)=>{
        this.success=true;
        this.error=true;
        this.mensaje=response.message;
        console.log(response.message);
        this.obtenerPacientes();
      },
      error: (error) =>{
        this.error=false;
        this.success=false;
        this.mensaje='Error al validar usuario.';
        console.log('Error al validar', error.error.message);
      }
    });
  }
  
  mostrarAlert(paciente: any){
    console.log(paciente);
    if (confirm('¿Estás seguro de que deseas eliminar a ' + paciente.nombres + '?')) {
      this.eliminarPaciente(paciente.correo);
    }
  }

  eliminarPaciente(correo: string){
    console.log(correo);
    this.conexionAzFunc.eliminarPacientee(correo).subscribe({
      next:(response)=>{
        this.success=true;
        this.error=true;
        this.mensaje=response.message;
        console.log(response.message);
        this.obtenerPacientes();
      },
      error: (error) =>{
        this.error=false;
        this.success=false;
        this.mensaje='Error al eliminar usuario.';
        console.log('Error al eliminar', error.error.message);
      }
    });    
  }
}
