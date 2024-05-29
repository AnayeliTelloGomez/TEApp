import { Component } from '@angular/core';
import { AnswersAct3Service } from '../../../services/answers-act3.service';
import { conexionAzFuncService } from '../../../services/conexionAzFunc.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-results-act3',
  standalone: true,
  imports: [NgxChartsModule,RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './results-act3.component.html',
  styleUrl: './results-act3.component.css'
})
export class ResultsAct3Component {
  correctCount: number = 0;
  incorrectCount: number = 0;
  elapsedTime: number = 0;
  correo: string = localStorage.getItem('correo') + '';

  pacientes: any[]=[];
  mensajeEliminado: string='';
  success: boolean=false;
  error: boolean=true;
  mensaje: string='';
  
  emocion: string='';
  act: string='';
  reactivo: string='';
  altaSuccess: boolean =false;
  altaError: boolean =true;
  submitted: boolean= false;
  altaMessage: string='';
  idact: number = 1;

  multi: any[] = [];
  multi2: any[] = [];

  constructor(private conexionAzFunc:conexionAzFuncService, private answerService: AnswersAct3Service, private route: ActivatedRoute ){ }

  ngOnInit(): void {
    const answers = this.answerService.getAnswers();
    this.correctCount = answers.filter(answer => answer.correct).length;
    this.incorrectCount = answers.filter(answer => !answer.correct).length;
    this.elapsedTime = this.answerService.getElapsedTime();

    this.route.paramMap.subscribe(params => {
      this.idact = Number(params.get('idact')) || 1;
      console.log(this.idact);
    });



    // Inicializa `multi` con los valores correctos
        this.multi = [
        {
          "name": "Actividad 3",
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
        "name": "Actividad 3",
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
  yAxisLabel: string = 'Numero de Reactivos';
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
  xAxisLabel2: string = 'Tiempo de Actividad';
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
