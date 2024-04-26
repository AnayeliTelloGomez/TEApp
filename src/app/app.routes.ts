import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AltaPacienteComponent } from './components/alta-paciente/alta-paciente.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    {path: 'registro', component: AltaPacienteComponent},

];

