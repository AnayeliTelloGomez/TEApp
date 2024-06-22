import { Component, OnInit, NgModule} from '@angular/core';
//importa el servicio para la solicitud http
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
//importa la interfaz para manejar el objt paciente
import { Usuario } from '../../models/usuario.interface';
import { Error } from '../../models/error.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-alta-usuario',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent],
  templateUrl: './alta-usuario.component.html',
  styleUrl: './alta-usuario.component.css',
  providers: [conexionAzFuncService]
})


export class AltaUsuarioComponent implements OnInit{

  correo: string='';
  contrasena: string='';
  nombres: string='';
  paterno: string='';
  materno: string='';
  tipo: string='';
  altaSuccess: boolean =false;
  altaError: boolean =true;
  submitted: boolean= false;
  altaMessage: string='';

  //instancia servicio
  constructor (private conexionAzFuncService: conexionAzFuncService){ }

  ngOnInit(): void {  }
  
  theme: string = 'light'; // Por defecto, se establece el tema en auto
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
  

  register(){
    this.submitted=true;
    const paciente: Usuario = {
      correo: this.correo,
      contrasena: this.contrasena,
      nombres: this.nombres,
      paterno: this.paterno,
      materno: this.materno,
      tipo: this.tipo
    };
    const requestBody = { paciente: paciente };
    this.conexionAzFuncService.altaPaciente(requestBody)
      .subscribe({
        next: (response) => {
          this.altaSuccess = true;
          this.altaError=true;
          this.altaMessage = response as string;
          this.correo = '';
          this.contrasena = '';
          this.nombres = '';
          this.paterno = '';
          this.materno = '';
          this.tipo='';
          this.submitted=false;
        },
        error: (error) => {
          this.altaError=false;
          this.altaSuccess=false;
          console.error('Error al registrar paciente: ', error);
          this.altaMessage = error.error.mensaje;//'Ocurrión un error mientras se registraba el usuario, intente de nuevo.';
        }
      });
  }

  onChangeTipoUsuario(event: any) {
    this.tipo = event.target.value;
  }
  
}
