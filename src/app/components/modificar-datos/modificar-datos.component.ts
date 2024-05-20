import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//importa el servicio para la solicitud http
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
//importa la interfaz para manejar el objt paciente
import { Usuario } from '../../models/usuario.interface';
import { CommonModule } from '@angular/common';
import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MenuEspecialistaComponent } from '../menu-especialista/menu-especialista.component';
import { MnuPacienteComponent } from '../mnu-paciente/mnu-paciente.component';
@Component({
  selector: 'app-modificar-datos',
  standalone: true,
  imports: [FormsModule,CommonModule,HPacienteComponent,MenuEspecialistaComponent,MnuPacienteComponent,],
  templateUrl: './modificar-datos.component.html',
  styleUrl: './modificar-datos.component.css'
})
export class ModificarDatosComponent implements OnInit{
  paciente: any;
  correo: string='';
  contrasena: string='';
  nombres: string='';
  paterno: string='';
  materno: string='';
  tipo: string=localStorage.getItem('tipo')+'';
  altaSuccess: boolean =false;
  altaError: boolean =true;
  submitted: boolean= false;
  altaMessage: string='';

  ngOnInit(): void {
    this.datosUsuario();
  }

  constructor(private conexionAzFunc:conexionAzFuncService){ }

  datosUsuario(){
    this.conexionAzFunc.datosUsuario(localStorage.getItem('correo')+'',localStorage.getItem('tipo')+'').subscribe(data => {
      this.paciente = data;
      this.correo=this.paciente.correo;
      this.nombres=this.paciente.nombres;
      this.paterno=this.paciente.paterno;
      this.materno=this.paciente.materno;

      console.log(this.paciente);
    });
  }

  guardarCambios(){
    this.submitted=true;
    const paciente: Usuario = {
      correo: localStorage.getItem('correo')+'',
      contrasena: '',
      nombres: this.nombres,
      paterno: this.paterno,
      materno: this.materno,
      tipo: this.tipo
    };
    console.log(paciente)
    const requestBody = { paciente: paciente };
    this.conexionAzFunc.guardarInfoUsuario(requestBody)
      .subscribe({
        next: (response) => {
          this.altaSuccess = true;
          this.altaError=true;
          this.altaMessage = response as string;
          this.submitted=false;
        },
        error: (error) => {
          this.altaError=false;
          this.altaSuccess=false;
          console.error('Error al registrar paciente: ', error);
          this.altaMessage = 'Ocurrión un error mientras se guardaban los cambios, intente de nuevo.';
        }
      });
  }


}
