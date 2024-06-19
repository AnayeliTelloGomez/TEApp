import { Component } from '@angular/core';
import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MenuuAdminComponent } from '../menuu-admin/menuu-admin.component';

@Component({
  selector: 'app-bienvenda-admin',
  standalone: true,
  imports: [HPacienteComponent,MenuuAdminComponent],
  templateUrl: './bienvenda-admin.component.html',
  styleUrl: './bienvenda-admin.component.css'
})
export class BienvendaAdminComponent {
  correo=localStorage.getItem('correo');
}
