import { Component } from '@angular/core';

import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MenuEspecialistaComponent } from '../menu-especialista/menu-especialista.component';
@Component({
  selector: 'app-bienvnida-especialista',
  standalone: true,
  imports: [HPacienteComponent,MenuEspecialistaComponent],
  templateUrl: './bienvnida-especialista.component.html',
  styleUrl: './bienvnida-especialista.component.css'
})
export class BienvnidaEspecialistaComponent {

}
