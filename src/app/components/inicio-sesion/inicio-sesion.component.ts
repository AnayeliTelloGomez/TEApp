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
  tipo: string='2';
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
      localStorage.setItem('tipo', '1');
      console.log(this.tipoUsuario+this.tipo)
    }else{
      this.tipoUsuario='Paciente';
      this.tipo='2';
      localStorage.setItem('tipo', '2');
      console.log(this.tipoUsuario+this.tipo);
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
        localStorage.setItem('correo', this.correo);
        if(localStorage.getItem('tipo')==='2'){
          console.log(this.tipo+'paciente')
          localStorage.setItem('inicio', 'true');
          this.router.navigate(['/inicioPaciente'])
        }else{
          console.log(this.tipo +'esp')
          localStorage.setItem('inicioEsp', 'true');
          this.router.navigate(['/inicioEspecialista'])
        }  
      },
      error: (error)=>{
        this.inicioDenied=false;
        if(this.tipo==='2')
          localStorage.setItem('inicio', 'false');
        else
          localStorage.setItem('inicioEsp', 'false');
        console.error('Credenciales erroneas: ',error.error.message);
        this.message='Correo o contraseña incorrectos.'
      }
    })
  }


  //avisarle al guard que se inicio sesion correctamente
  getAuthToken(): Observable<boolean>{
    if(localStorage.getItem('inicio')==='true')
      return of(true);
    else{
      return of(false);
    }
  }

  //avisarle al guard que se inicio sesion correctamente
  getAuthTokenEsp(): Observable<boolean>{
    console.log(localStorage.getItem)
    if(localStorage.getItem('inicioEsp')==='true')
      return of(true);
    else{
      return of(false);
    }
  }

}
