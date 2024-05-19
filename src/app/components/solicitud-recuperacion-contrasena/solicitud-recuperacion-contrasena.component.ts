import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { HeaderComponent } from '../header/header.component';
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';

@Component({
  selector: 'app-solicitud-recuperacion-contrasena',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FormsModule],
  templateUrl: './solicitud-recuperacion-contrasena.component.html',
  styleUrl: './solicitud-recuperacion-contrasena.component.css'
})
export class SolicitudRecuperacionContrasenaComponent {
  correo: string='';
  envioSuccess:boolean=false;
  conSuccess:boolean=false;
  error:boolean=true;
  message:string='';
  codigo:string='';
  contrasena:string='';

  constructor (private conexionAzFunc: conexionAzFuncService){}

  enviarCodigo(){
    this.conexionAzFunc.enviarCodigoValidacion(this.correo).subscribe({
      next:(response)=>{
        this.envioSuccess=true;
        this.error=true;
        this.message=response.message;
        console.log(response.message);
      },
      error: (error) =>{
        this.error=false;
        this.envioSuccess=false;
        this.message='Error al enviar código de verificación, intente más tarde.';
        console.log('Error al enviar', error.error.message);
      }
    });
  }

  validarCodigo(){
    this.conexionAzFunc.reestablecerContrasena(this.correo,this.codigo,this.contrasena).subscribe({
      next:(response)=>{
        this.envioSuccess=false;
        this.conSuccess=true;
        this.error=true;
        this.message=response.message;
        console.log(response.message);
        this.codigo='';
        this.contrasena='';
      },
      error: (error) =>{
        this.error=false;
        this.envioSuccess=false;
        this.message='Error al reestablecer contraseña, intente más tarde.';
        console.log('Error al enviar', error.error.message);
      }
    });
  }

}
