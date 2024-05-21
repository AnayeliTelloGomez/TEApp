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


//actividades
import { PruebaComponent } from './components/actividades/prueba/prueba.component';
import { Activity1Component } from './components/actividades/activity-1/activity-1.component';
import { Activity2Component } from './components/actividades/activity-2/activity-2.component';
import { Activity3Component } from './components/actividades/activity-3/activity-3.component';
import { Activity4Component } from './components/actividades/activity-4/activity-4.component';
import { Activity5Component } from './components/actividades/activity-5/activity-5.component';
import { ResultsAct3Component } from './components/actividades/results-act3/results-act3.component';
import { ResultsAct4Component } from './components/actividades/results-act4/results-act4.component';
import { ResultsAct5Component } from './components/actividades/results-act5/results-act5.component';
import { NombreCapturaComponent } from './components/actividades/nombre-captura/nombre-captura.component';



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
    {path: 'prueba', component: PruebaComponent},
    {path: 'activity1/:emotion',component: Activity1Component},
    {path: 'activity2/:emotion',component: Activity2Component},
    {path: 'activity3/:emotion/:repetitions', component: Activity3Component},
    {path: 'activity4/:emotion/:count', component: Activity4Component},
    {path: 'activity5/:emotion', component: Activity5Component},
    {path: 'resultados_act3', component: ResultsAct3Component},
    {path: 'resultados_act4', component: ResultsAct4Component},
    {path: 'resultados_act5', component: ResultsAct5Component},
    { path: 'nombrecaptura/:emotion', component: NombreCapturaComponent},


    {path: '**', component: InicioSesionComponent},
];

