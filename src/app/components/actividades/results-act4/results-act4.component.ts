import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { conexionAzFuncService } from '../../../services/conexionAzFunc.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-results-act4',
  standalone: true,
  imports: [NgxChartsModule,RouterLink,RouterOutlet, RouterLinkActive,MatIconModule,MatButtonModule],
  templateUrl: './results-act4.component.html',
  styleUrl: './results-act4.component.css'
})
export class ResultsAct4Component implements OnInit {
  correctCount: number = 0;
  incorrectCount: number = 0;
  elapsedTime: number = 0;
  idact: number=0;
  altaSuccess: boolean =false;
  altaError: boolean =true;
  submitted: boolean= false;
  altaMessage: string='';

  multi: any[] = [];
  multi2: any[] = [];
  legendPosition: LegendPosition = LegendPosition.Below;
  

  constructor(private router: Router, private route: ActivatedRoute, private conexionAzFunc:conexionAzFuncService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as { incorrectCount: number, correctCount: number, elapsedTime: number };
      this.correctCount = state.correctCount;
      this.incorrectCount = state.incorrectCount;
      this.elapsedTime = state.elapsedTime;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idact = Number(params.get('idact')) || 1;
      console.log(this.idact);
    });


    // Inicializa `multi` con los valores correctos
    this.multi = [
      {
        "name": "Actividad 4",
        "series": [
         {
           "name": "Correctas",
            "value": this.correctCount
          },
          {
           "name": "Incorrectas",
           "value": this.incorrectCount
          }
        ]
      }
      ];



  // Inicializa `multi2` con los valores correctos
  this.multi2 = [
    {
      "name": "Actividad 4",
      "series": [
        {
          "name": "0",
           "value": "0"
        },
       {
         "name": "1",
          "value": this.elapsedTime
        }
      ]
    }
    ];

  }



  view: [number, number] = [600, 300];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Actividad';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Número de reactivos';
  legendTitle: string = 'Respuestas';


  onSelect(data : any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data : any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data : any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }





  // options
  showXAxis2: boolean = true;
  showYAxis2: boolean = true;
  gradient2: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel2: string = 'Tiempo de actividad';
  showYAxisLabel2: boolean = true;
  yAxisLabel2: string = ' Segundos';





  guardarEst(){
    console.log(this.correctCount+' '+this.incorrectCount+' '+this.elapsedTime);
    const estadistica = {
      idact:this.idact+'',
      correctas: this.correctCount+'',
      incorrectas: this.incorrectCount+'',
      tiempo: this.elapsedTime+''
    };
    console.log(estadistica)

    this.conexionAzFunc.guardarEstadistica(estadistica)
      .subscribe({
        next: (response) => {
          this.altaSuccess = true;
          this.altaError=true;
          this.altaMessage = response.message;
          this.submitted=false;
        },
        error: (error) => {
          this.altaError=false;
          this.altaSuccess=false;
          console.error('Error al guardas los datos: ', error);
          this.altaMessage = 'Ocurrión un error mientras se guardaban los cambios, intente de nuevo.';
        }
      });

  }


}
