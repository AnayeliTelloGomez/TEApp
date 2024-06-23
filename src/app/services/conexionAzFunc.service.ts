import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class conexionAzFuncService{
  private apiURL ='https://tt-appfunctions.azurewebsites.net/api'

  constructor(private http: HttpClient){ }

  altaPaciente(requestBody: any){
    return this.http.post<any>(`${this.apiURL}/AltaPaciente`,requestBody)
  }

  inicioSesion(requestBody: any){
    return this.http.post<any>(`${this.apiURL}/inicioSesion`,requestBody);
  }

  desplieguePacientes(correo:string){
    return this.http.get<any>(`${this.apiURL}/desplieguePaciente?correo=${correo}`);
  }

  pacientesAsignados(correo: string){
    return this.http.get<any>(`${this.apiURL}/pacientesAsignados?idEsp=${correo}`);
  }

  eliminarPacientee(correo: string){
    return this.http.get<any>(`${this.apiURL}/eliminarPaciente?correo=${correo}`);
  }

  validarPaciente(correo: string, idEsp: string){
    return this.http.get<any>(`${this.apiURL}/validarPaciente?correo=${correo}&idEsp=${idEsp}`);
  }

  despliegueEspecialistas(){
    return this.http.get<any>(`${this.apiURL}/despliegueEspecialista`);
  }

  eliminarEspecialista(correo: string){
    return this.http.get<any>(`${this.apiURL}/eliminarEspecialista?correo=${correo}`);
  }

  validarEspecialista(correo: string, idEsp: string){
    return this.http.get<any>(`${this.apiURL}/validarEspecialista?correo=${correo}&idAdmin=${idEsp}`);
  }
  enviarCodigoValidacion(correo: string){
    return this.http.get<any>(`${this.apiURL}/codigoValidar?correo=${correo}`);
  }

  reestablecerContrasena(correo: string,codigo:string,contrasena:string){
    console.log(correo+codigo+contrasena)
    return this.http.get<any>(`${this.apiURL}/validarCodigo?correo=${correo}&codigo=${codigo}&contrasena=${contrasena}`);
  }
  datosUsuario(correo: string, tipo: string){
    return this.http.get<any>(`${this.apiURL}/informacionUsuario?correo=${correo}&tipo=${tipo}`);
  }
  guardarInfoUsuario(requestBody: any) :Observable<string>{
    console.log(requestBody)
    return this.http.post(`${this.apiURL}/guardarInfoUsuario`,requestBody, { responseType: 'text' })
  }

  asignarActividad(requestBody: any):Observable<any>{
    console.log(requestBody)
    return this.http.post(`${this.apiURL}/altaActividad`,requestBody)
  }

  despliegueActividades(correo:string){
    return this.http.get<any>(`${this.apiURL}/despliegueActividades?correo=${correo}`);
  }

  registrarPuntaje(requestBody: any):Observable<any>{
    console.log(requestBody)
    return this.http.post(`${this.apiURL}/registrarPuntaje`,requestBody)
  }

  guardarEstadistica(requestBody: any):Observable<any>{
    console.log(requestBody)
    return this.http.post(`${this.apiURL}/guardarEstadistica`,requestBody)
  }

  estadisticaPaciente(requestBody: any): Observable<any> {
    console.log(requestBody);
    return this.http.post<any>(`${this.apiURL}/estadisticaPaciente`, requestBody);
  }

}
