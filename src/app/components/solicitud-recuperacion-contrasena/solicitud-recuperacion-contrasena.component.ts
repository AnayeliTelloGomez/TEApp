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
  submitted: boolean= false;
  submitted2: boolean= false;

  constructor (private conexionAzFunc: conexionAzFuncService){}

  enviarCodigo(){
    this.submitted=true;
    if(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(this.correo))
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
        console.log('Error al enviar', error.error.mensaje);
      }
    });
  }
  
  passwordInvalid: boolean = false;
  validatePassword() {
    const password = this.contrasena;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^\w]/.test(password);
    console.log(!hasSpecial || !hasNumber || !hasLower || !hasUpper)
    return this.passwordInvalid = !hasSpecial || !hasNumber || !hasLower || !hasUpper;
    
  }

  validarCodigo(){
    this.submitted2=true;
    if(!this.passwordInvalid)
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
        console.log('Error al reestablecer', error.error.mensaje);
      }
    });
  }

}
