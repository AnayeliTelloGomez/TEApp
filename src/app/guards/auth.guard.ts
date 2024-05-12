import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { InicioSesionComponent } from '../components/inicio-sesion/inicio-sesion.component';
 

export const authGuard: CanActivateFn = (route, state) => {
  const inicioSesion=inject(InicioSesionComponent);
  inicioSesion.getAuthToken().subscribe(valor=>{console.log("auth ",valor)})
  return inicioSesion.getAuthToken();
};
