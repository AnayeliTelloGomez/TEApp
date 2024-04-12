import { Component, OnInit, NgModule} from '@angular/core';
//importa el servicio para la solicitud http
import { altaPacienteService } from '../../services/alta-paciente.service';
//importa la interfaz para manejar el objt paciente
import { Paciente } from '../../models/paciente.interface';
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
  altaSuccess: boolean=false;
  altaMessage: string='';
  constructor (private altaPacienteService: altaPacienteService){ }

  ngOnInit(): void {  }
  

  register(){
    const paciente: Paciente = {
      correo: this.correo,
      contrasena: this.contrasena,
      nombres: this.nombres,
      paterno: this.paterno,
      materno: this.materno
    };
    const requestBody = { paciente: paciente };
    this.altaPacienteService.altaPaciente(requestBody)
      .subscribe({
        next: (response) => {
          this.altaSuccess = true;
          this.altaSuccess = true;
          this.altaMessage = response as string;
          this.correo = '';
          this.contrasena = '';
          this.nombres = '';
          this.paterno = '';
          this.materno = '';
        },
        error: (error) => {
          console.error('Error al registrar paciente: ', error);
          this.altaSuccess = false;
          this.altaMessage = 'Ocurrión un error mientras se registraba el paciente.';
        }
      });
  }  
  
}
