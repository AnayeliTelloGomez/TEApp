import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class altaPacienteService{
  //private apiURL ='https://tt-appfunctions.azurewebsites.net/api'
  private apiURL ='https://tt-appfunctions.azurewebsites.net/api'

  constructor(private http: HttpClient){ }

  altaPaciente(requestBody: any) :Observable<string>{
    console.log(requestBody)
    return this.http.post(`${this.apiURL}/AltaPaciente`,requestBody, { responseType: 'text' })
  }

}
