import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { ModificarDatosComponent } from './components/modificar-datos/modificar-datos.component';
import { DesplieguePacientesComponent } from './components/despliegue-pacientes/despliegue-pacientes.component';
import { DespliegueEspecialistasComponent } from './components/despliegue-especialistas/despliegue-especialistas.component';
import { BienvenidaPacienteComponent } from './components/bienvenida-paciente/bienvenida-paciente.component';

import { authGuard } from './guards/auth.guard'; 

export const routes: Routes = [
    {path: '', component: InicioComponent },
    {path: 'registro', component: AltaUsuarioComponent},
    {path: 'inicioSesion', component:InicioSesionComponent},
    {path: 'inicioPaciente', component: BienvenidaPacienteComponent, canActivate: [authGuard]},
    {path: 'modificarDatos', component: ModificarDatosComponent},
    {path: 'validarPacientes', component: DesplieguePacientesComponent, canActivate: [authGuard]},
    {path: 'validarEspecialistas', component: DespliegueEspecialistasComponent},
    
    
    {path: '**', component: InicioSesionComponent},
];

