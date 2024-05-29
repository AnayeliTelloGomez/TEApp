import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-activity-5',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, RouterOutlet ,
    MatIconModule,MatDividerModule,MatButtonModule,MatGridListModule, 
    FormsModule,CommonModule
  ],
  templateUrl: './activity-5.component.html',
  styleUrl: './activity-5.component.css'
})
export class Activity5Component implements OnInit {

  nombre: string = '';
  emocion: string = '';
  historia: string = '';
  mostrarHistoria: boolean = true;
  mostrarOpciones: boolean = false;
  mostrarError: boolean = false;
  mostrarFin: boolean = false;
  pasoActual: number = 0;
  historias: { [key: string]: string[] } = {};
  opciones: { [key: string]: { texto: string, correcta: boolean }[][] } = {};
  respuestas: { texto: string, correcta: boolean }[] = [];  // Almacena las respuestas
  tiempoInicio: number = 0; // Timestamp de inicio
  idact: number = 1;


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre') || 'Amigo';
    this.route.paramMap.subscribe(params => {
      this.emocion = params.get('emotion') || 'Enojo';
      this.idact = Number(params.get('idact')) || 1;
    });
    this.configurarHistorias();
    this.configurarOpciones();
    this.actualizarHistoria();
    this.tiempoInicio = Date.now(); // Iniciar temporizador
  }

  configurarHistorias() {
    this.historias = {
      enojo: [
        `Había una vez un niño llamado ${this.nombre} que estaba jugando en el parque con sus amigos. Era un día soleado y todos estaban divirtiéndose mucho. Mientras jugaban al fútbol, uno de los amigos de ${this.nombre} pateó la pelota muy fuerte y golpeó a ${this.nombre} sin querer.`,
        `Después del incidente, ${this.nombre} y sus amigos decidieron construir un castillo de arena. Estaban trabajando juntos cuando un amigo accidentalmente lo derrumbó.`,
        `Más tarde, ${this.nombre} quiere jugar con un juguete, pero su amigo no quiere compartir.`,
        `De repente, uno de los amigos de ${this.nombre} hizo un comentario que le molestó mucho.`,
        `Al final del día, ${this.nombre} y sus amigos se pelean por quién debe llevarse un balón a casa.`,
        `Después de hablarlo, todos estuvieron de acuerdo y decidieron seguir turnándose para llevar el balón a casa. Al final, ${this.nombre} aprendió que mantener la calma y hablar sobre sus sentimientos ayudaba a resolver los problemas de una manera más amigable y justa. Fue un día de muchas lecciones, pero también de mucha diversión.`
      ],
      alegria: [
        `Era el cumpleaños de ${this.nombre} y estaba muy emocionado porque todos sus amigos iban a venir a su fiesta. Mientras decoraban, ${this.nombre} accidentalmente rompió una decoración.`,
        `Los invitados comenzaron a llegar y todos estaban muy felices. Sin embargo, uno de los amigos de ${this.nombre} empezó a llorar porque no le gustaba el juego que estaban jugando.`,
        `Llega el momento de abrir los regalos y ${this.nombre} recibe un regalo que ya tiene.`,
        `Mientras jugaban en el jardín, uno de los amigos de ${this.nombre} se cayó y se lastimó.`,
        `Al final de la fiesta, ${this.nombre} se da cuenta de que uno de sus amigos está solo.`,
        `La fiesta terminó siendo un éxito y todos los amigos de ${this.nombre} se fueron a casa con una sonrisa en el rostro. ${this.nombre} aprendió que la alegría se multiplica cuando todos se sienten incluidos y felices.`
      ],
      miedo: [
        `Una noche, ${this.nombre} estaba en casa y de repente escuchó un ruido extraño afuera. ${this.nombre} estaba muy asustado y pensaba que podría ser un monstruo.`,
        `Con el apoyo de su papá, ${this.nombre} se dio cuenta de que el ruido venía de una rama golpeando la ventana. Esa noche, ${this.nombre} tuvo que enfrentarse a otro miedo: ir al baño solo durante la noche.`,
        `En la escuela, ${this.nombre} tiene que presentar un trabajo frente a la clase.`,
        `Una noche, ${this.nombre} escuchó un cuento de miedo antes de dormir y no pudo conciliar el sueño.`,
        `${this.nombre} ve una película de miedo en casa de un amigo.`,
        `${this.nombre} se dio cuenta de que enfrentarse a sus miedos y pedir ayuda cuando lo necesitaba lo hacía sentir más valiente. Fue una experiencia que le enseñó a manejar sus miedos con valentía y confianza.`
      ],
      asco: [
        `Un día, ${this.nombre} fue con su familia a un restaurante nuevo que servía comida exótica. Le sirvieron un plato con ingredientes que nunca había visto.`,
        `En la escuela, ${this.nombre} encontró un insecto en su almuerzo.`,
        `Un día, ${this.nombre} tuvo que ayudar a limpiar la casa, incluyendo sacar la basura.`,
        `Durante una visita al zoológico, ${this.nombre} vio a un animal que le parecía muy feo.`,
        `En casa, ${this.nombre} encontró comida vencida en el refrigerador.`,
        `Al final de su aventura, ${this.nombre} aprendió que a veces, lo que parece desagradable puede no ser tan malo y que es importante mantener la calma y buscar soluciones. Fue una lección valiosa sobre enfrentar el asco con responsabilidad y madurez.`
      ],
    tristeza: [
        `Un día, ${this.nombre} se sintió muy triste porque su mascota favorita se había perdido. Estaba tan triste que no quería salir a jugar.`,
        `Al día siguiente, ${this.nombre} vio que sus amigos estaban jugando y divirtiéndose sin él.`,
        `En la escuela, ${this.nombre} no podía concentrarse porque seguía pensando en su mascota.`,
        `Sus amigos le hicieron una carta para animarlo, pero ${this.nombre} aún se sentía triste.`,
        `Después de unos días, ${this.nombre} todavía no encontraba a su mascota y estaba perdiendo la esperanza.`,
        `Al final, ${this.nombre} encontro su mascota y aprendió que es normal sentirse triste a veces, pero hablar con los demás y buscar ayuda puede hacer que los días difíciles sean más llevaderos. A veces, la tristeza se convierte en esperanza con un poco de apoyo y tiempo.`
      ],
      // Agrega aquí las historias para Miedo, Asco y Tristeza...
    };
  }

  configurarOpciones() {
    this.opciones = {
      enojo: [
        [
          { texto: `${this.nombre} se enoja mucho y empieza a gritarle al amigo.`, correcta: false },
          { texto: `${this.nombre} respira hondo y le dice a su amigo que fue un accidente.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} sugiere que reconstruyan el castillo juntos.`, correcta: true },
          { texto: `${this.nombre} se enoja y destruye el castillo de su amigo.`, correcta: false }
        ],
        [
          { texto: `${this.nombre} le arrebata el juguete.`, correcta: false },
          { texto: `${this.nombre} pide el juguete amablemente y espera su turno.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} habla con su amigo sobre cómo se siente.`, correcta: true },
          { texto: `${this.nombre} se pone a llorar y se va.`, correcta: false }
        ],
        [
          { texto: `${this.nombre} se queda con el balón sin preguntar.`, correcta: false },
          { texto: `${this.nombre} propone turnarse para llevar el balón cada día.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho ${this.nombre}!`, correcta: true }
        ]
      ],
      alegria: [
        [
          { texto: `${this.nombre} se siente mal y no quiere seguir decorando.`, correcta: false },
          { texto: `${this.nombre} decide arreglarlo y continuar decorando con una sonrisa.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} lo ignora y sigue jugando con los demás.`, correcta: false },
          { texto: `${this.nombre} se acerca a su amigo y le pregunta qué le gustaría hacer.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} muestra su desilusión y deja el regalo a un lado.`, correcta: false },
          { texto: `${this.nombre} agradece a su amigo y piensa en regalarlo a alguien más tarde.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} sigue jugando sin prestar atención.`, correcta: false },
          { texto: `${this.nombre} detiene el juego y ayuda a su amigo.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} lo deja solo y sigue con sus otros amigos.`, correcta: false },
          { texto: `${this.nombre} va y lo invita a unirse al grupo.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho ${this.nombre}!`, correcta: true }
        ]
      ],
      miedo: [
        [
          { texto: `${this.nombre} decide esconderse bajo la cama.`, correcta: false },
          { texto: `${this.nombre} va a buscar a su papá para contarle lo que escuchó.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} enciende una luz y va al baño rápidamente.`, correcta: true },
          { texto: `${this.nombre} decide no ir al baño y aguanta toda la noche. `, correcta: false }
        ],
        [
          { texto: `${this.nombre} decide no presentar el trabajo porque está nervioso.`, correcta: false },
          { texto: `${this.nombre} se prepara bien y respira hondo antes de presentar.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} le pide a su mamá que le cuente otro cuento más feliz.`, correcta: true },
          { texto: `${this.nombre} decide no dormir en toda la noche.`, correcta: false }
        ],
        [
          { texto: `${this.nombre} no le dice a su amigo que está asustado y sigue viendo.`, correcta: false },
          { texto: `${this.nombre} le dice a su amigo que no le gustan las películas de miedo y quiere ver otra cosa.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho ${this.nombre}!`, correcta: true }
        ]
      ],
      asco: [
        [
          { texto: `${this.nombre} dice que no va a comer porque no le gusta cómo se ve.`, correcta: false },
          { texto: `${this.nombre} decide probar un poquito antes de decir que no le gusta.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} grita y tira todo su almuerzo a la basura.`, correcta: false },
          { texto: `${this.nombre} avisa a su maestro y pide otro almuerzo.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} usa guantes y se encarga de la tarea rápidamente.`, correcta: true },
          { texto: `${this.nombre} se niega a hacerlo porque la basura le da asco.`, correcta: false }
        ],
        [
          { texto: `${this.nombre} escucha la explicación del guía sobre por qué es importante.`, correcta: true },
          { texto: `${this.nombre} se ríe y dice que el animal es horrible.`, correcta: false }
        ],
        [
          { texto: `${this.nombre} la deja ahí porque no quiere tocarla.`, correcta: false },
          { texto: `${this.nombre} a tira y limpia el lugar donde estaba.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho ${this.nombre}!`, correcta: true }
        ]
      ],
      tristeza: [
        [
          { texto: `${this.nombre} habla con sus padres sobre lo que siente.`, correcta: true },
          { texto: `${this.nombre} se queda en su cuarto todo el día.`, correcta: false }
        ],
        [
          { texto: `${this.nombre} se acerca y les pide jugar con ellos.`, correcta: true },
          { texto: `${this.nombre} se aleja y decide no unirse. `, correcta: false }
        ],
        [
          { texto: `${this.nombre} no hace su trabajo y se queda triste.`, correcta: false },
          { texto: `${this.nombre} le pide a su maestro que le ayude a concentrarse.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} ignora la carta y se aleja de sus amigos.`, correcta: false },
          { texto: `${this.nombre} agradece la carta y trata de estar más contento.`, correcta: true }
        ],
        [
          { texto: `${this.nombre} decide dejar de buscar y rendirse.`, correcta: false },
          { texto: `${this.nombre} pide ayuda a sus vecinos para seguir buscando.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho ${this.nombre}!`, correcta: true }
        ]
      ],
      // Agrega aquí las opciones para Miedo, Asco y Tristeza...
    };
  }

  actualizarHistoria() {
    this.historia = this.historias[this.emocion][this.pasoActual];
    this.mostrarOpciones = true;
    this.mostrarError = false;
  }

  elegirOpcion(correcta: boolean) {
    this.respuestas.push({
      texto: this.opciones[this.emocion][this.pasoActual].find(op => op.correcta === correcta)!.texto,
      correcta: correcta
    });
    if (correcta) {
      this.pasoActual++;
      if (this.pasoActual < this.historias[this.emocion].length) {
        this.actualizarHistoria();
      } else {
        this.mostrarFin = true;
      }
    } else {
      this.mostrarError = true;
      this.mostrarOpciones = false;
    }
  }

  regresar() {
    this.mostrarError = false;
    this.mostrarOpciones = true;
  }

  terminarHistoria() {
    const tiempoFinal = Date.now();
    const tiempoTotal = (tiempoFinal - this.tiempoInicio) / 1000; // Tiempo en segundos
    const totalCorrectas = this.respuestas.filter(r => r.correcta).length;
    const totalIncorrectas = this.respuestas.filter(r => !r.correcta).length;

    // Aquí puedes redirigir o mostrar un componente con los resultados
    // Por ejemplo, si tienes una ruta específica para mostrar los resultados:
    // this.router.navigate(['/resultados'], { state: { correctas: totalCorrectas, incorrectas: totalIncorrectas, tiempo: tiempoTotal } });

    console.log(`Respuestas correctas: ${totalCorrectas}`);
    console.log(`Respuestas incorrectas: ${totalIncorrectas}`);
    console.log(`Tiempo total: ${tiempoTotal} segundos`);

    // Navegar al componente de resultados con el estado de las respuestas
  this.router.navigate(['/resultados_act5',this.idact], { state: { correctas: totalCorrectas, incorrectas: totalIncorrectas, tiempo: tiempoTotal } });
  }


}
