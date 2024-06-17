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
  historiaActual: string = '';
  reflexionActual: string = ''; // Para almacenar la reflexión de la opción incorrecta
  historias: { [key: string]: string[] } = {};
  opciones: { [key: string]: { texto: string, correcta: boolean, reflexion?: string }[][] } = {};
  respuestas: { texto: string, correcta: boolean }[] = [];  // Almacena las respuestas
  tiempoInicio: number = 0; // Timestamp de inicio
  idact: number = 1;
  imagenActual: string = ''; // Nueva propiedad para almacenar la imagen actual
  imagenes: { [key: string]: string[] } = {}; // Nueva propiedad para las imágenes

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre') || 'Amigo';
    this.route.paramMap.subscribe(params => {
      this.emocion = params.get('emotion') || 'Enojo';
      this.idact = Number(params.get('idact')) || 1;
    });
    this.configurarHistorias();
    this.configurarOpciones();
    this.configurarImagenes(); 
    this.actualizarHistoria();
    
    this.tiempoInicio = Date.now(); // Iniciar temporizador
  }

  configurarHistorias() {
    this.historias = {
      enojo: [
        `Había una vez un niño llamado ${this.nombre} que estaba jugando en la playa con sus amigos. Era un día soleado y todos estaban divirtiéndose mucho. Mientras jugaban al fútbol, uno de los amigos de ${this.nombre} pateó la pelota muy fuerte y golpeó a ${this.nombre} sin querer.`,
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
        `Al final, ${this.nombre} encontró su mascota y aprendió que es normal sentirse triste a veces, pero hablar con los demás y buscar ayuda puede hacer que los días difíciles sean más llevaderos. A veces, la tristeza se convierte en esperanza con un poco de apoyo y tiempo.`
      ],
    };
  }

  configurarOpciones() {
    this.opciones = {
      enojo: [
        [
          {
            texto: `${this.nombre} se enoja mucho y empieza a gritarle al amigo.`,
            correcta: false,
            reflexion: `Gritarle a alguien puede empeorar la situación y lastimar sus sentimientos. Es mejor hablar calmadamente sobre lo que sucedió.`
          },
          { texto: `${this.nombre} respira hondo y le dice a su amigo que fue un accidente.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} sugiere que reconstruyan el castillo juntos.`,
            correcta: true
          },
          {
            texto: `${this.nombre} se enoja y destruye el castillo de su amigo.`,
            correcta: false,
            reflexion: `Destruir algo en respuesta al enojo no resuelve el problema y puede hacer sentir mal a los demás. Es importante encontrar formas de cooperar.`
          }
        ],
        [
          {
            texto: `${this.nombre} le arrebata el juguete.`,
            correcta: false,
            reflexion: `Arrebatar cosas puede causar conflictos y no es justo para los demás. Pedir amablemente es una mejor manera de obtener lo que deseas.`
          },
          { texto: `${this.nombre} pide el juguete amablemente y espera su turno.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} habla con su amigo sobre cómo se siente.`,
            correcta: true
          },
          {
            texto: `${this.nombre} se pone a llorar y se va.`,
            correcta: false,
            reflexion: `Llorar y alejarse puede hacer que te sientas peor y no ayuda a resolver el problema. Hablar sobre tus sentimientos puede ayudar a aclarar la situación.`
          }
        ],
        [
          {
            texto: `${this.nombre} se queda con el balón sin preguntar.`,
            correcta: false,
            reflexion: `Tomar algo sin preguntar puede parecer injusto y egoísta. Es mejor encontrar una solución que funcione para todos.`
          },
          { texto: `${this.nombre} propone turnarse para llevar el balón cada día.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho ${this.nombre}!`, correcta: true }
        ]
      ],
      alegria: [
        [
          {
            texto: `${this.nombre} se pone triste y deja de ayudar con la decoración.`,
            correcta: false,
            reflexion: `Sentirse mal por un accidente es natural, pero rendirse no ayudará. Intentar arreglarlo o seguir adelante puede mantener la diversión.`
          },
          { texto: `${this.nombre} se ríe y encuentra otra decoración para usar.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} ignora a su amigo y sigue jugando.`,
            correcta: false,
            reflexion: `Ignorar a alguien que se siente mal puede hacerlo sentir peor. Es importante mostrar empatía y tratar de consolarlo.`
          },
          { texto: `${this.nombre} va a consolar a su amigo y sugiere otro juego.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se enoja porque ya tiene ese regalo.`,
            correcta: false,
            reflexion: `Enojarse por recibir un regalo duplicado puede lastimar los sentimientos de quien lo dio. Agradecer el gesto es siempre una buena opción.`
          },
          { texto: `${this.nombre} agradece el regalo y piensa en cómo usarlo.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se ríe de su amigo y sigue jugando.`,
            correcta: false,
            reflexion: `Reírse de alguien que se lastimó puede hacerlo sentir mal. Ayudarlo y asegurarse de que está bien es lo correcto.`
          },
          { texto: `${this.nombre} corre a ayudar a su amigo y lo lleva con un adulto.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} ignora a su amigo y sigue disfrutando de la fiesta.`,
            correcta: false,
            reflexion: `Dejar a alguien solo en una fiesta puede hacer que se sienta excluido. Invitarlo a unirse a la diversión muestra amabilidad y consideración.`
          },
          { texto: `${this.nombre} invita a su amigo a jugar con los demás.`, correcta: true }
        ],
        [
          { texto: `¡Gran trabajo, ${this.nombre}!`, correcta: true }
        ]
      ],
      miedo: [
        [
          {
            texto: `${this.nombre} se esconde debajo de la cama.`,
            correcta: false,
            reflexion: `Esconderse puede aumentar el miedo. Enfrentar la situación con ayuda puede hacer que te sientas más seguro.`
          },
          { texto: `${this.nombre} llama a su papá y juntos investigan el ruido.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decide aguantar el miedo y no dice nada.`,
            correcta: false,
            reflexion: `No enfrentar el miedo puede hacerlo más fuerte. Pedir ayuda y hablar sobre ello puede aliviar el temor.`
          },
          { texto: `${this.nombre} le pide a su papá que lo acompañe al baño.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decide no presentar el trabajo por miedo.`,
            correcta: false,
            reflexion: `Evitar enfrentar el miedo puede impedir que logres tus objetivos. Prepararse y pedir apoyo puede ayudarte a tener éxito.`
          },
          { texto: `${this.nombre} practica su presentación y se siente más seguro.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se queda despierto toda la noche asustado.`,
            correcta: false,
            reflexion: `No poder dormir por miedo puede ser muy agotador. Hablar con alguien de confianza sobre tus temores puede ayudarte a sentirte mejor.`
          },
          { texto: `${this.nombre} le cuenta a su papá sobre el cuento y hablan sobre ello.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decide no volver a ver películas de miedo.`,
            correcta: false,
            reflexion: `Evitar completamente lo que te asusta puede limitar tus experiencias. Enfrentar el miedo con apoyo puede hacer que te sientas más valiente.`
          },
          { texto: `${this.nombre} habla con su amigo sobre la película y se siente mejor.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho, ${this.nombre}!`, correcta: true }
        ]
      ],
      asco: [
        [
          {
            texto: `${this.nombre} se niega a probar la comida y se va.`,
            correcta: false,
            reflexion: `Rechazar la comida sin probarla puede hacer que te pierdas experiencias nuevas. Intentar probar un poco puede ser una buena idea.`
          },
          { texto: `${this.nombre} decide probar un pequeño bocado de la comida.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} tira su almuerzo y no come nada.`,
            correcta: false,
            reflexion: `Reaccionar exageradamente puede no ser necesario. Informar a un adulto y pedir otro almuerzo puede resolver el problema.`
          },
          { texto: `${this.nombre} informa a su maestro sobre el insecto y obtiene un nuevo almuerzo.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se niega a limpiar y se va.`,
            correcta: false,
            reflexion: `Evitar las tareas desagradables puede hacerlas más difíciles. Enfrentarlas con rapidez puede hacer que terminen más rápido.`
          },
          { texto: `${this.nombre} usa guantes y limpia rápidamente la basura.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se burla del animal y se aleja.`,
            correcta: false,
            reflexion: `Burlarse de algo o alguien no es una buena actitud. Aprender sobre los animales puede ayudarte a entender y apreciar sus características.`
          },
          { texto: `${this.nombre} decide observar al animal más de cerca y aprende sobre él.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} cierra el refrigerador y se niega a comer en casa.`,
            correcta: false,
            reflexion: `Ignorar la comida vencida puede ser peligroso. Informar a un adulto y desecharla es lo correcto para mantener la seguridad.`
          },
          { texto: `${this.nombre} informa a sus padres y juntos desechan la comida vencida.`, correcta: true }
        ],
        [
          { texto: `¡Gran trabajo, ${this.nombre}!`, correcta: true }
        ]
      ],
      tristeza: [
        [
          {
            texto: `${this.nombre} decide quedarse en casa y no hacer nada.`,
            correcta: false,
            reflexion: `Quedarse solo cuando te sientes triste puede hacer que te sientas peor. Salir y hacer actividades con amigos puede mejorar tu ánimo.`
          },
          { texto: `${this.nombre} decide salir a buscar a su mascota con sus amigos.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se enoja con sus amigos por no invitarlo.`,
            correcta: false,
            reflexion: `Enojarse con tus amigos puede empeorar tus sentimientos de tristeza. Hablar con ellos y expresar cómo te sientes puede ayudarte a sentirte mejor.`
          },
          { texto: `${this.nombre} se une a sus amigos y les cuenta lo que le preocupa.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decide no prestar atención en clase.`,
            correcta: false,
            reflexion: `No concentrarte en clase puede afectar tu aprendizaje. Hablar con un maestro o amigo sobre lo que te preocupa puede ayudarte a concentrarte mejor.`
          },
          { texto: `${this.nombre} le cuenta a su maestro lo que le está pasando.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se enoja y rompe la carta.`,
            correcta: false,
            reflexion: `Reaccionar con enojo ante la amabilidad de los demás puede lastimar sus sentimientos. Aceptar el apoyo puede ayudarte a sentirte mejor.`
          },
          { texto: `${this.nombre} agradece la carta y se siente un poco mejor.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} pierde la esperanza y deja de buscar.`,
            correcta: false,
            reflexion: `Rendirse puede hacer que te sientas aún más triste. Continuar buscando y tener esperanza puede llevarte a un resultado positivo.`
          },
          { texto: `${this.nombre} sigue buscando a su mascota con la ayuda de sus amigos.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho, ${this.nombre}!`, correcta: true }
        ]
      ]
    };
  }

  configurarImagenes() {
    this.imagenes = {
      enojo: [
        '../../../../assets/img/hist/enojo/1.jpg',
        '../../../../assets/img/hist/enojo/2.jpg',
        '../../../../assets/img/hist/enojo/3.jpg',
        '../../../../assets/img/hist/enojo/4.jpg',
        '../../../../assets/img/hist/enojo/5.jpg',
        '../../../../assets/img/hist/enojo/6.jpg'
      ],
      alegria: [
        'assets/images/alegria1.jpg',
        'assets/images/alegria2.jpg',
        'assets/images/alegria3.jpg',
        'assets/images/alegria4.jpg',
        'assets/images/alegria5.jpg',
        'assets/images/alegria6.jpg'
      ],
      miedo: [
        'assets/images/miedo1.jpg',
        'assets/images/miedo2.jpg',
        'assets/images/miedo3.jpg',
        'assets/images/miedo4.jpg',
        'assets/images/miedo5.jpg',
        'assets/images/miedo6.jpg'
      ],
      asco: [
        'assets/images/asco1.jpg',
        'assets/images/asco2.jpg',
        'assets/images/asco3.jpg',
        'assets/images/asco4.jpg',
        'assets/images/asco5.jpg',
        'assets/images/asco6.jpg'
      ],
      tristeza: [
        'assets/images/tristeza1.jpg',
        'assets/images/tristeza2.jpg',
        'assets/images/tristeza3.jpg',
        'assets/images/tristeza4.jpg',
        'assets/images/tristeza5.jpg',
        'assets/images/tristeza6.jpg'
      ]
    };
  }
  

  actualizarHistoria() {
    this.historiaActual = this.historias[this.emocion][this.pasoActual];
    this.imagenActual = this.imagenes[this.emocion][this.pasoActual]; // Actualizar la imagen actual
    this.mostrarHistoria = true;
    this.mostrarOpciones = true;
    this.mostrarError = false;
    this.reflexionActual = ''; // Reinicia la reflexión
  }

  elegirOpcion(correcta: boolean, indice: number) {
    const opcionElegida = this.opciones[this.emocion][this.pasoActual][indice];
    this.respuestas.push({
      texto: opcionElegida.texto,
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
      this.reflexionActual = opcionElegida.reflexion || 'Reflexiona sobre por qué esta opción no es la mejor.';
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