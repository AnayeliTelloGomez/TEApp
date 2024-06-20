import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
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
  selector: 'app-inicio-sesion-admin',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent,RouterOutlet,RouterLinkActive,RouterLink],
  templateUrl: './inicio-sesion-admin.component.html',
  styleUrl: './inicio-sesion-admin.component.css'
})
export class InicioSesionAdminComponent implements OnInit{
  tipoUsuario: string='Paciente';
  //para ver el tipo de usuario seleccionado
  tipoUsuarioBtn: boolean=false;
  //caracteristicas del usuario a iniciar sesion
  correo: string='';
  contrasena: string='';
  tipo: string='4';
  
  //controlar el mennsaje de credenciales incorrectas
  inicioDenied: boolean=true;
  //el mensaje a mostrar en el alert
  message: string='';

  ngOnInit(): void {  }


  //servicio
  constructor (private conexionAzFunc: conexionAzFuncService, private router: Router) { }

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
        localStorage.setItem('tipo',this.tipo)
        console.log(this.tipo +'admin')
        localStorage.setItem('inicioAdmin', 'true');
        this.router.navigate(['/inicioAdmin'])  
      },
      error: (error)=>{
        this.inicioDenied=false;
        localStorage.setItem('inicioAdmin', 'false');
        console.error('Credenciales erroneas: ',error.error.message);
        this.message='Correo o contraseña incorrectos.'
      }
    })
  }


  //avisarle al guard que se inicio sesion correctamente
  getAuthToken(): Observable<boolean>{
    if(localStorage.getItem('inicioAdmin')==='true')
      return of(true);
    else{
      return of(false);
    }
  }
}
