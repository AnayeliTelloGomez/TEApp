import { Component, OnInit, NgModule} from '@angular/core';
//importa el servicio para la solicitud http
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
//validar formulario
import { FormGroup, FormControl, Validators } from '@angular/forms';
//importa la interfaz para manejar el objt paciente
import { Usuario } from '../../models/usuario.interface';
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

  pass= new FormControl('',Validators.required);

  //instancia servicio
  constructor (private conexionAzFuncService: conexionAzFuncService){ }

  ngOnInit(): void {  }
  
  theme: string = 'light'; // Por defecto, se establece el tema en auto
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  passwordInvalid: boolean = false;

  validatePassword() {
    const password = this.contrasena;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^\w]/.test(password);
    return this.passwordInvalid = !hasUpper || !hasLower || !hasNumber || !hasSpecial;
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
          this.altaMessage = response.message;
          this.correo = '';
          this.contrasena = '';
          this.nombres = '';
          this.paterno = '';
          this.materno = '';
          this.tipo='';
          this.submitted=false;
        },
        error: (error) => {
          this.altaSuccess=false;
          console.error('Error al registrar paciente: ', error);
          this.altaMessage = error.error.mensaje;//'Ocurrión un error mientras se registraba el usuario, intente de nuevo.';
          if(this.altaMessage== 'Ya hay un usuario con ese correo electrónico.')
            this.altaError=false;
        }
      });
  }

  onChangeTipoUsuario(event: any) {
    this.tipo = event.target.value;
  }
  
}
