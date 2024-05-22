import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterOutlet, RouterLinkActive,Router} from '@angular/router';


import { conexionAzFuncService } from '../../services/conexionAzFunc.service';
import { HPacienteComponent } from '../h-paciente/h-paciente.component';
import { MnuPacienteComponent } from '../mnu-paciente/mnu-paciente.component';


@Component({
  selector: 'app-despliegue-actividades',
  standalone: true,
  imports: [HPacienteComponent, CommonModule,MnuPacienteComponent,
    RouterLink,RouterOutlet, RouterLinkActive,
  ],
  templateUrl: './despliegue-actividades.component.html',
  styleUrl: './despliegue-actividades.component.css'
})
export class DespliegueActividadesComponent implements OnInit {
  actividades: any[]=[];
  imgsCard: string='';

  constructor (private conexionAzFunc: conexionAzFuncService){}

  ngOnInit(): void {
    this.obtenerActividades();
  }

  obtenerActividades(): void{
    this.conexionAzFunc.despliegueActividades(localStorage.getItem('correo')+'').subscribe(data => {
      this.actividades = data;
      console.log(this.actividades);
    });
  }

  descripcionAct(act:string){
    if(act==='activity1')
      return 'descripcion actividad 1';
    else if(act==='activity2')
          return 'descripcion actividad 2';
        else if(act==='activity3')
              return 'descripcion actividad 3';
            else if(act==='activity4')
                  return 'descripcion actividad 4';
                else
                return 'descripcion actividad 5';        
  }

  imgCard(act:string){
    if(act==='activity1')
      return '../../../assets/img/Emociones/imgCard/act1.png';
    else if(act==='activity2')
          return '../../../assets/img/Emociones/imgCard/act2.png';
        else if(act==='activity3')
              return '../../../assets/img/Emociones/imgCard/act3.png';
            else if(act==='activity4')
                  return '../../../assets/img/Emociones/imgCard/act4.png';
                else
                return '../../../assets/img/Emociones/imgCard/act5.png';   
  }
  
  ruta(act:string, emocion:string, reactivos:string){
    if(act==='activity1')
      return '/'+act+'/'+emocion;
    else if(act==='activity2')
          return '/'+act+'/'+emocion;
        else if(act==='activity3')
              return '/'+act+'/'+emocion+'/'+reactivos;
            else if(act==='activity4')
                return '/'+act+'/'+emocion+'/'+reactivos;
                else
                  return '/'+'nombrecaptura'+'/'+emocion;
  }
}
