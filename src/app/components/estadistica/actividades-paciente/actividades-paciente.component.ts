import { Component, OnInit } from '@angular/core';
import { HPacienteComponent } from '../../h-paciente/h-paciente.component';
import { MnuPacienteComponent } from '../../mnu-paciente/mnu-paciente.component';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterOutlet, RouterLinkActive,Router, ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actividades-paciente',
  standalone: true,
  imports: [HPacienteComponent, CommonModule,MnuPacienteComponent,
    RouterLink,RouterOutlet, RouterLinkActive, FormsModule,
  ],
  templateUrl: './actividades-paciente.component.html',
  styleUrls: ['./actividades-paciente.component.css']
})
export class ActividadesPacienteComponent implements OnInit {
  reactivo: string='';
  emocion: string = '';
  idpac: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const emotion = params.get('emotion');
      this.idpac = Number(params.get('idpaciente')) || 1;
      if (emotion) {
        this.emocion = emotion;
      }
    });
  }

  desplegarEst(actividad: string) {
    if (actividad === 'activity5') {
      this.reactivo = '1';
    }
    this.router.navigate([`/estadisticaActividad`, this.emocion ,actividad,this.reactivo, this.idpac]);
  }

}
