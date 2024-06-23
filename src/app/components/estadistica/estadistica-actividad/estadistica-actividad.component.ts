import { Component, OnInit } from '@angular/core';
import { HPacienteComponent } from '../../h-paciente/h-paciente.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { RouterLink,RouterOutlet, RouterLinkActive,Router, ActivatedRoute} from '@angular/router';
import { conexionAzFuncService } from '../../../services/conexionAzFunc.service';

interface Actividad {
  idactividad: number;
  correctas: number;
  incorrectas: number;
  tiempo: number;
}

interface ChartData {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

interface TotalData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-estadistica-actividad',
  standalone: true,
  imports: [NgxChartsModule, HPacienteComponent],
  templateUrl: './estadistica-actividad.component.html',
  styleUrls: ['./estadistica-actividad.component.css']
})
export class EstadisticaActividadComponent implements OnInit {

  actividades: Actividad[] = [
    { idactividad: 101, correctas: 5, incorrectas: 2, tiempo: 30 },
    { idactividad: 4, correctas: 7, incorrectas: 3, tiempo: 45 },
    { idactividad: 7, correctas: 6, incorrectas: 4, tiempo: 40 },
    { idactividad: 20, correctas: 10, incorrectas: 1, tiempo: 50 },
    { idactividad: 30, correctas: 8, incorrectas: 2, tiempo: 35 },
    { idactividad: 100, correctas: 12, incorrectas: 5, tiempo: 55 },
  ];

  correctasData: ChartData[] = [];
  incorrectasData: ChartData[] = [];
  tiempoData: ChartData[] = [];
  totalData: TotalData[] = [];

  view: [number, number] = [0, 0];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  xAxisLabel = 'Actividad';
  showYAxisLabel = true;
  yAxisLabel = 'Respuestas';
  yAxisLabelTime = 'Tiempo (minutos)';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  emotion: string ='';
  activity: string ='';
  reactivo: string ='';
  idpac: number = 1;
  altaSuccess: boolean =false;
  altaError: boolean =true;
  submitted: boolean= false;
  altaMessage: string='';

  mensajeEliminado: string='';
  success: boolean=false;
  error: boolean=true;
  mensaje: string='';

  estadistica: any;
  estadisticas: Actividad[] = [];
  correctCount: string='';
  incorrectCount: string='';
  elapsedTime: string='';


  constructor(private router: Router, private route: ActivatedRoute, private conexionAzFunc:conexionAzFuncService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const emotion = params.get('emotion');
      const activity = params.get('activity');
      const reactivo = params.get('reactivo');
      this.idpac = Number(params.get('idpaciente')) || 1;
      if (emotion && activity && reactivo) {
        this.emotion = emotion;
        this.activity = activity;
        this.reactivo = reactivo;
      }
    });

    this.estadisticaPaciente();
  }


  estadisticaPaciente(){
    console.log(this.idpac+' '+this.emotion+' '+this.activity+' '+this.reactivo);
    const actividad = {
      idpaciente: this.idpac+'',
      act: this.activity,
      emocion: this.emotion+'',
      reactivos: this.reactivo+''
    };
    console.log(actividad)

    this.conexionAzFunc.estadisticaPaciente(actividad)
      .subscribe(data => {
        this.estadisticas = data.map((item: any) => ({
          idactividad: Number(item.idactividad),  // Asegúrate de que esta propiedad exista en los datos recibidos
          correctas: Number(item.correctas),
          incorrectas: Number(item.incorrectas),
          tiempo: Number(item.tiempo)
        }));

        console.log(this.estadisticas);
        console.log(this.actividades)

        this.prepareChartData();
      });

      
  }

  prepareChartData() {
    this.estadisticas.sort((a, b) => a.idactividad - b.idactividad);

    this.correctasData = [
      {
        name: 'Respuestas Correctas',
        series: this.estadisticas.map(estadistica => ({
          name: `id ${estadistica.idactividad}`,
          value: estadistica.correctas
        }))
      }
    ];

    this.incorrectasData = [
      {
        name: 'Respuestas Incorrectas',
        series: this.estadisticas.map(estadistica => ({
          name: `id ${estadistica.idactividad}`,
          value: estadistica.incorrectas
        }))
      }
    ];

    this.tiempoData = [
      {
        name: 'Tiempo',
        series: this.estadisticas.map(estadistica => ({
          name: `id ${estadistica.idactividad}`,
          value: estadistica.tiempo
        }))
      }
    ];

    const totalCorrectas = this.estadisticas.reduce((sum, estadistica) => sum + estadistica.correctas, 0);
    const totalIncorrectas = this.estadisticas.reduce((sum, estadistica) => sum + estadistica.incorrectas, 0);
    this.totalData = [
      { name: 'Correctas', value: totalCorrectas },
      { name: 'Incorrectas', value: totalIncorrectas }
    ];
  }

}
