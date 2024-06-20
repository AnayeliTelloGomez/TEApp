import { inject } from '@angular/core';
import { CanActivateFn , CanMatchFn} from '@angular/router';
import { InicioSesionComponent } from '../components/inicio-sesion/inicio-sesion.component';
import { InicioSesionAdminComponent } from '../components/inicio-sesion-admin/inicio-sesion-admin.component';

export const authAdmin: CanMatchFn = (route, state) => {
  const inicioSesion=inject(InicioSesionAdminComponent);
  console.log(sessionStorage.getItem('inicioAdmin'))
  inicioSesion.getAuthToken().subscribe(valor=>{console.log("auth ",valor)})
  return inicioSesion.getAuthToken();
};
