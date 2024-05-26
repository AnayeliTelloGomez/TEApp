import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-despliegue-especialistas',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './despliegue-especialistas.component.html',
  styleUrl: './despliegue-especialistas.component.css'
})
export class DespliegueEspecialistasComponent implements OnInit{
  especialistas: any[]=[];
  mensajeEliminado: string='';
  success: boolean=false;
  error: boolean=true;
  mensaje: string='';
  
  constructor(private conexionAzFunc:conexionAzFuncService){ }

  ngOnInit(): void {
    this.obtenerPacientes();
    //this.success=false;
  }

  obtenerPacientes(): void{
    this.conexionAzFunc.despliegueEspecialistas().subscribe(data => {
      this.especialistas = data;
      console.log(this.especialistas);
    });
  }
    
  validarPaciente(correo: string, idEsp: string){
    console.log(correo);
    this.conexionAzFunc.validarEspecialista(correo,idEsp).subscribe({
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
  
  mostrarAlert(especialista: any){
    console.log(especialista);
    if (confirm('¿Estás seguro de que deseas eliminar a ' + especialista.nombres + '?')) {
      this.eliminarPaciente(especialista.correo);
    }
  }

  eliminarPaciente(correo: string){
    console.log(correo);
    this.conexionAzFunc.eliminarEspecialista(correo).subscribe({
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
