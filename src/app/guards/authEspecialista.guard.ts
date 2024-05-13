import { inject } from '@angular/core';
import { CanActivateFn , CanMatchFn} from '@angular/router';
import { InicioSesionComponent } from '../components/inicio-sesion/inicio-sesion.component';

export const authEspecialista: CanActivateFn = (route, state) => {
  const inicioSesion=inject(InicioSesionComponent);
  console.log(sessionStorage.getItem('inicioEsp'))
  inicioSesion.getAuthTokenEsp().subscribe(valor=>{console.log("auth ",valor)})
  return inicioSesion.getAuthTokenEsp();
};
