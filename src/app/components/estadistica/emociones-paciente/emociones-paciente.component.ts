import { Component, OnInit } from '@angular/core';
import { HPacienteComponent } from '../../h-paciente/h-paciente.component';
import { MnuPacienteComponent } from '../../mnu-paciente/mnu-paciente.component';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterOutlet, RouterLinkActive,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-emociones-paciente',
  standalone: true,
  imports: [HPacienteComponent, CommonModule,MnuPacienteComponent,
    RouterLink,RouterOutlet, RouterLinkActive,
  ],
  templateUrl: './emociones-paciente.component.html',
  styleUrls: ['./emociones-paciente.component.css']
})
export class EmocionesPacienteComponent implements OnInit {
  idpac: number=0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idpac = Number(params.get('idpaciente')) || 1;
      console.log(this.idpac);
    });
  }

}
