import { Component, OnInit, NgModule} from '@angular/core';
//importa el servicio para la solicitud http
import { altaPacienteService } from '../../services/alta-paciente.service';
//importa la interfaz para manejar el objt paciente
import { Usuario } from '../../models/usuario.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alta-paciente',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './alta-paciente.component.html',
  styleUrl: './alta-paciente.component.css',
  providers: [altaPacienteService]
})
export class AltaPacienteComponent implements OnInit{
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
  constructor (private altaPacienteService: altaPacienteService){ }

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
    this.altaPacienteService.altaPaciente(requestBody)
      .subscribe({
        next: (response) => {
          this.altaSuccess = true;
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
          console.error('Error al registrar paciente: ', error);
          this.altaMessage = 'Ocurrión un error mientras se registraba el paciente, intente de nuevo.';
        }
      });
  }

  onChangeTipoUsuario(event: any) {
    this.tipo = event.target.value;
  }
  
}
