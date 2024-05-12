import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//ser accesible mediante otros componentes
import { Injectable } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
//servicio para la peticion http
import {conexionAzFuncService} from '../../services/conexionAzFunc.service';
//interfaz para crear el json a mandar
import {usuarioInicio} from '../../models/usuarioIncio.interface';
//para retornar el valor al guard
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
  providers: [conexionAzFuncService]
})
export class InicioSesionComponent implements OnInit{
  //contrala el tipo de usario segun se seleccione el boton
  tipoUsuario: string='Paciente';
  //para ver el tipo de usuario seleccionado
  tipoUsuarioBtn: boolean=false;
  //caracteristicas del usuario a iniciar sesion
  correo: string='';
  contrasena: string='';
  tipo: string='';
  //controlar el mennsaje de credenciales incorrectas
  inicioDenied: boolean=true;
  //el mensaje a mostrar en el alert
  message: string='';

  ngOnInit(): void {  }


  //servicio
  constructor (private conexionAzFunc: conexionAzFuncService, private router: Router) { }

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
    //creacion de obj a enviar
    const usuarioIncio: usuarioInicio = {
      correo: this.correo,
      contrasena: this.contrasena,
      tipo: this.tipo,
    };
    const requesBody = {usuarioInicio: usuarioIncio};

    //peticion mediante el servicio
    this.conexionAzFunc.inicioSesion(requesBody)
    .subscribe({
      next: (response)=>{
        this.message=response.message;
        console.log(response.message);
        sessionStorage.setItem('correo', this.correo);
        sessionStorage.setItem('inicio', 'true');
        this.router.navigate(['/inicioPaciente'])
      },
      error: (error)=>{
        this.inicioDenied=false;
        sessionStorage.setItem('inicio', 'false');
        console.error('Credenciales erroneas: ',error.error.message);
        this.message='Correo o contraseña incorrectos.'
      }
    })
  }


  //avisarle al guard que se inicio sesion correctamente
  getAuthToken(): Observable<boolean>{
    if(sessionStorage.getItem('inicio')==='true')
      return of(true);
    else{
      return of(false);
    }
  }

}
