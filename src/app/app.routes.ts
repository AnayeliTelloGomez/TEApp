import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { ModificarDatosComponent } from './components/modificar-datos/modificar-datos.component';
import { DesplieguePacientesComponent } from './components/despliegue-pacientes/despliegue-pacientes.component';
import { DespliegueEspecialistasComponent } from './components/despliegue-especialistas/despliegue-especialistas.component';
import { BienvenidaPacienteComponent } from './components/bienvenida-paciente/bienvenida-paciente.component';
import { BienvnidaEspecialistaComponent } from './components/bienvnida-especialista/bienvnida-especialista.component';
import { SolicitudRecuperacionContrasenaComponent } from './components/solicitud-recuperacion-contrasena/solicitud-recuperacion-contrasena.component';
import { authEspecialista } from './guards/authEspecialista.guard';
import { authGuard } from './guards/auth.guard'; 



export const routes: Routes = [
    {path: '', component: InicioComponent },
    {path: 'registro', component: AltaUsuarioComponent},
    {path: 'inicioSesion', component:InicioSesionComponent},
    {path: 'recuperarContrasena', component:SolicitudRecuperacionContrasenaComponent},
    {path: 'inicioEspecialista', component: BienvnidaEspecialistaComponent, canMatch: [authEspecialista]},
    {path: 'inicioPaciente', component: BienvenidaPacienteComponent, canMatch: [authGuard]},
    {path: 'modificarDatos', component: ModificarDatosComponent, canMatch: [authEspecialista]},
    {path: 'modificarDatos', component: ModificarDatosComponent, canMatch: [authGuard]},
    {path: 'validarPacientes', component: DesplieguePacientesComponent, canMatch: [authEspecialista]},
    {path: 'validarEspecialistas', component: DespliegueEspecialistasComponent},
    {path: '**', component: InicioSesionComponent},
];

