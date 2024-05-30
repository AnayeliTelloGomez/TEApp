import { Component, OnInit } from '@angular/core';
import { HPacienteComponent } from '../../h-paciente/h-paciente.component';
import { MenuEspecialistaComponent } from '../../menu-especialista/menu-especialista.component';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterOutlet, RouterLinkActive,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-emociones-especialista',
  standalone: true,
  imports: [HPacienteComponent, CommonModule,MenuEspecialistaComponent,
    RouterLink,RouterOutlet, RouterLinkActive,
  ],
  templateUrl: './emociones-especialista.component.html',
  styleUrls: ['./emociones-especialista.component.css']
})
export class EmocionesEspecialistaComponent implements OnInit {

  idpac: number=0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idpac = Number(params.get('idpaciente')) || 1;
      console.log(this.idpac);
    });
  }


}
