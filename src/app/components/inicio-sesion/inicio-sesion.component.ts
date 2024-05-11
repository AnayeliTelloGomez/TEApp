import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
//servicio para la peticion http
import {conexionAzFuncService} from '../../services/conexionAzFunc.service';
//interfaz para crear el json a mandar
import {usuarioInicio} from '../../models/usuarioIncio.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
  providers: [conexionAzFuncService]
})
export class InicioSesionComponent implements OnInit{
  tipoUsuario: string='Paciente';
  tipoUsuarioBtn: boolean=false;
  correo: string='';
  contrasena: string='';
  tipo: string='';
  inicioSuccess: boolean=false;
  inicioDenied: boolean=true;
  message: string='';

  ngOnInit(): void {  }

  //servicio
  constructor (private conexionAzFunc: conexionAzFuncService) { }

  tipoUser(){
    if(this.tipoUsuarioBtn){
      this.tipoUsuario='Especialista';
      this.tipo='1';
      console.log(this.tipoUsuario)
    }else{
      this.tipoUsuario='Paciente';
      console.log(this.tipoUsuario)
      this.tipo='2';
    }
  }

  verificar(){
    const usuarioIncio: usuarioInicio = {
      correo: this.correo,
      contrasena: this.contrasena,
      tipo: this.tipo,
    };

    const requesBody = {usuarioInicio: usuarioIncio};
    this.conexionAzFunc.inicioSesion(requesBody)
    .subscribe({
      next: (response)=>{
        this.inicioSuccess=true;
        this.message=response as string;
      },
      error: (error)=>{
        this.inicioDenied=false;
        console.error('Credenciales erroneas: ',error.error.message);
        this.message='Correo o contraseña incorrectos.'
      }
    })
  }
}
