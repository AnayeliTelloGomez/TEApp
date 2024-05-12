import { Component, OnInit } from '@angular/core';
import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MnuPacienteComponent } from '../mnu-paciente/mnu-paciente.component';

@Component({
  selector: 'app-bienvenida-paciente',
  standalone: true,
  imports: [HPacienteComponent, MnuPacienteComponent,],
  templateUrl: './bienvenida-paciente.component.html',
  styleUrl: './bienvenida-paciente.component.css'
})
export class BienvenidaPacienteComponent implements OnInit {
  ngOnInit(): void {  }
}
