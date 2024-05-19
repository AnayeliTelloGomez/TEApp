import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { InicioSesionComponent } from '../components/inicio-sesion/inicio-sesion.component';
 

export const authGuard: CanMatchFn = (route, state) => {
  const inicioSesion=inject(InicioSesionComponent);
  inicioSesion.getAuthToken().subscribe(valor=>{console.log("auth ",valor)})
  return inicioSesion.getAuthToken();
};
