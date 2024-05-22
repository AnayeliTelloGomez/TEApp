import { Component, OnInit} from '@angular/core';
import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MenuEspecialistaComponent } from '../menu-especialista/menu-especialista.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pacientes-asignados',
  standalone: true,
  imports: [HPacienteComponent,MenuEspecialistaComponent,CommonModule, FormsModule],
  templateUrl: './pacientes-asignados.component.html',
  styleUrl: './pacientes-asignados.component.css'
})
export class PacientesAsignadosComponent implements OnInit{
  pacientes: any[]=[];
  mensajeEliminado: string='';
  success: boolean=false;
  error: boolean=true;
  mensaje: string='';
  
  emocion: string='';
  act: string='';
  reactivo: string='';
  altaSuccess: boolean =false;
  altaError: boolean =true;
  submitted: boolean= false;
  altaMessage: string='';



  constructor(private conexionAzFunc:conexionAzFuncService){ }

  ngOnInit(): void {
    this.pacientesAsignados();
  }

  pacientesAsignados(): void{
    this.conexionAzFunc.pacientesAsignados(localStorage.getItem('correo')+'').subscribe(data => {
      this.pacientes = data;
      console.log(this.pacientes);
    });
  }

  asignarAct(paciente: string, idesp: string){
    console.log(paciente+' '+idesp+' '+this.emocion+' '+this.act+' '+this.reactivo);
    const actividad = {
      idpaciente: paciente+'',
      idespecialista: idesp+'',
      act: this.act,
      emocion: this.emocion,
      reactivos: this.reactivo+''
    };
    console.log(actividad)

    this.conexionAzFunc.asignarActividad(actividad)
      .subscribe({
        next: (response) => {
          this.altaSuccess = true;
          this.altaError=true;
          this.altaMessage = response.message;
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
