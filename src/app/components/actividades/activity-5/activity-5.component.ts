import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;


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

  feedbackImage: string = '';
  showFeedback: boolean = false;

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
        `Un día, ${this.nombre} estaba jugando en la playa con sus amigos. Era un día soleado y todos estaban divirtiéndose mucho. Mientras jugaban al fútbol, uno de sus amigos ${this.nombre} pateó la pelota muy fuerte y golpeó a ${this.nombre} sin querer.`,
        `Después de lo ocurrido, ${this.nombre} y sus amigos decidieron construir un castillo de arena. Estaban trabajando juntos cuando un amigo accidentalmente lo derrumbó.`,
        `Más tarde, ${this.nombre} quiería jugar con un juguete, pero su amigo no quierían compartir.`,
        `De repente, uno de los amigos de ${this.nombre} hizo un comentario que le molestó mucho.`,
        `Al final del día, ${this.nombre} y sus amigos se pelearon por quién debía llevarse un balón a casa.`,
        `Después de hablarlo, todos estuvieron de acuerdo y decidieron cada uno de ellos de llevaría el balón un día de la semana. Al final, ${this.nombre} aprendió que mantener la calma y hablar sobre sus sentimientos ayudaba a resolver los problemas de una manera más amigable y justa. Fue un día de muchas lecciones, pero también de mucha diversión.`
      ],
      alegria: [
        `Era el cumpleaños de ${this.nombre} y estaba muy emocionado porque todos sus amigos iban a venir a su fiesta. Mientras decoraban, ${this.nombre} accidentalmente rompió una decoración.`,
        `Los invitados comenzaron a llegar y todos estaban muy felices. Tristemente, uno de los amigos de ${this.nombre} empezó a llorar porque no le gustaba el juego que eligieron.`,
        `Más tarde, al abrir los regalos ${this.nombre} recibe un regalo que ya tenía.`,
        `Mientras jugaban en el jardín, uno de los amigos de ${this.nombre} se cayó y se lastimó.`,
        `Al final de la fiesta, ${this.nombre} se dio cuenta de que uno de sus amigos estaba solo.`,
        `La fiesta terminó siendo un éxito y todos los amigos de ${this.nombre} se fueron a casa con una sonrisa en el rostro. ${this.nombre} aprendió que la alegría se multiplica cuando todos se sienten incluidos y felices.`
      ],
      miedo: [
        `Una noche, ${this.nombre} estaba en casa y de repente escuchó un ruido raro desde afuera. ${this.nombre} estaba muy asustado y pensaba que podría ser un monstruo.`,
        `Con el apoyo de su papá, ${this.nombre} se dio cuenta de que el ruido venía de una rama que golpeaba la ventana. Esa noche, ${this.nombre} tuvo que enfrentarse a otro miedo, el cual era ir al baño solo durante la noche.`,
        `En la escuela, ${this.nombre} tenía que presentar un trabajo frente a la clase.`,
        `${this.nombre} recordó, que una noche escuchó un cuento de miedo antes de dormir y por ese recuerdo no podía dormir.`,
        `${this.nombre} ve una película de miedo en casa de un amigo.`,
        `${this.nombre} se dio cuenta de que enfrentarse a sus miedos y pedir ayuda cuando lo necesitaba lo hacía sentir más valiente. Fue una experiencia que le enseñó a manejar sus miedos con valentía y confianza.`
      ],
      asco: [
        `Un día, ${this.nombre} fue con su familia a un restaurante nuevo, que servía comida que ${this.nombre} no había comido antes. Le sirvieron un plato con ingredientes que nunca había visto.`,
        `En la escuela, ${this.nombre} encontró un animalito en su almuerzo.`,
        `Un día, ${this.nombre} tuvo que ayudar a limpiar la casa y lo pusieron a sacar la basura.`,
        `Durante una visita al zoológico, ${this.nombre} vio a un animal que le parecía muy feo.`,
        `En casa, ${this.nombre} encontró comida echada a perder en el refrigerador.`,
        `Al final de su aventura, ${this.nombre} aprendió que a veces, lo que parece desagradable puede no ser tan malo y que es importante mantener la calma y buscar soluciones. Fue una lección valiosa sobre enfrentar el asco con responsabilidad y madurez.`
      ],
      tristeza: [
        `Un día, ${this.nombre} se sintió muy triste porque su mascota favorita se había perdido. Estaba tan triste que no quería salir a jugar.`,
        `Al día siguiente, ${this.nombre} vio que sus amigos estaban jugando y divirtiéndose sin él.`,
        `En la escuela, ${this.nombre} no podía concentrarse porque seguía pensando en su mascota.`,
        `Sus amigos le hicieron una carta para animarlo, pero ${this.nombre} aún se sentía triste.`,
        `Después de unos días, ${this.nombre} todavía no encontraba a su mascota y comenzaba a creer que ya no la volvería a ver.`,
        `Al final, ${this.nombre} encontró su mascota y aprendió que es normal sentirse triste, pero hablar con los demás y buscar ayuda puede hacer que los días difíciles sean más sencillos.`
      ],
    };
  }

  configurarOpciones() {
    this.opciones = {
      enojo: [
        [
          {
            texto: `${this.nombre} se enojó mucho y empezó a gritarle a su amigo.`,
            correcta: false,
            reflexion: `Gritarle a alguien puede empeorar la situación y lastimar sus sentimientos. Es mejor hablar con tranquilidad sobre lo que sucedió.`
          },
          { texto: `${this.nombre} respiró hondo y le dijo a su amigo que fue un accidente.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} le dijo a sus amigos que reconstruyeran el castillo juntos.`,
            correcta: true
          },
          {
            texto: `${this.nombre} se enojó y destruyó el castillo de su amigo.`,
            correcta: false,
            reflexion: `Destruir algo por sentir enojo no resuelve el problema y puede hacer sentir mal a los demás. Es importante encontrar formas de ayudar.`
          }
        ],
        [
          {
            texto: `${this.nombre} le arrebató el juguete.`,
            correcta: false,
            reflexion: `Arrebatar cosas puede causar problemas y no es justo para los demás. Pedir amablemente es una mejor manera de obtener lo que quieres.`
          },
          { texto: `${this.nombre} pidió el juguete amablemente y espero su turno.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} habló con su amigo sobre cómo se sentía.`,
            correcta: true
          },
          {
            texto: `${this.nombre} se puso a llorar y se fue.`,
            correcta: false,
            reflexion: `Llorar y alejarse puede hacer que te sientas peor y no ayuda a resolver el problema. Hablar sobre tus sentimientos puede ayudar a aclarar lo que sucede.`
          }
        ],
        [
          {
            texto: `${this.nombre} se quedó con el balón sin preguntar.`,
            correcta: false,
            reflexion: `Tomar algo sin preguntar puede ser grosero. Es mejor encontrar una solución que funcione para todos.`
          },
          { texto: `${this.nombre} propuso que cada uno de sus amigos se llevara el balón un día diferente a su casa.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho ${this.nombre}!`, correcta: true }
        ]
      ],
      alegria: [
        [
          {
            texto: `${this.nombre} se sintió triste y dejo de ayudar con la decoración.`,
            correcta: false,
            reflexion: `Sentirse mal por un accidente es normal, pero rendirse no ayudará. Intentar arreglarlo o seguir adelante puede mantener la diversión.`
          },
          { texto: `${this.nombre} se rip y encontró otra decoración para usar.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} ignoró a su amigo y siguió jugando.`,
            correcta: false,
            reflexion: `Ignorar a alguien que se siente mal puede hacerlo sentir peor. Es importante mostrar interés y tratar de ayudarlo.`
          },
          { texto: `${this.nombre} fue a ayudar a su amigo y sugirio otro juego.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se enojó porque ya tiene ese regalo.`,
            correcta: false,
            reflexion: `Enojarse por recibir un regalo que ya tenías puede lastimar los sentimientos de quien lo dio. Agradecer el regalo es siempre una buena opción.`
          },
          { texto: `${this.nombre} agradeció el regalo y pensó en cómo usarlo.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se rio de su amigo y siguió jugando.`,
            correcta: false,
            reflexion: `Reírse de alguien que se lastimó puede hacerlo sentir mal. Ayudarlo y asegurarse de que está bien es lo mejor.`
          },
          { texto: `${this.nombre} corrió a ayudar a su amigo y lo llevó con un adulto.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} ignoró a su amigo y siguió en su fiesta.`,
            correcta: false,
            reflexion: `Dejar a alguien solo en una fiesta puede hacer que se sienta triste. Invitarlo a unirse a la diversión lo ayudará a sentirme mejor.`
          },
          { texto: `${this.nombre} invitó a su amigo a jugar con los demás.`, correcta: true }
        ],
        [
          { texto: `¡Gran trabajo, ${this.nombre}!`, correcta: true }
        ]
      ],
      miedo: [
        [
          {
            texto: `${this.nombre} se escondió debajo de la cama.`,
            correcta: false,
            reflexion: `Esconderse puede aumentar el miedo. Enfrentar la situación con ayuda puede hacer que te sientas más seguro.`
          },
          { texto: `${this.nombre} llamó a su papá y juntos buscaron qué era ese ruido.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decidió aguantar el miedo y no dijo nada.`,
            correcta: false,
            reflexion: `No enfrentar el miedo puede hacerlo más fuerte. Pedir ayuda y hablar sobre lo que sientes puede ayudar a sentir miedo.`
          },
          { texto: `${this.nombre} le pidió a su papá que lo acompañara al baño.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decidió no presentar el trabajo por miedo.`,
            correcta: false,
            reflexion: `Evitar enfrentar el miedo puede impedir que logres tus objetivos. Prepararse y pedir apoyo puede ayudarte.`
          },
          { texto: `${this.nombre} practicó su exposición y se sintió más seguro.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} no durmió toda la noche, pues tenía miedo.`,
            correcta: false,
            reflexion: `No poder dormir por miedo puede ser muy díficil. Hablar con alguien de confianza sobre tus temores puede ayudarte a sentirte mejor.`
          },
          { texto: `${this.nombre} le contó a su papá sobre el cuento y hablaron sobre ello.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decidií no volver a ver películas de miedo.`,
            correcta: false,
            reflexion: `Evitar completamente lo que te asusta puede alejarte de descubrir nuevas cosas. Enfrentar el miedo con apoyo puede hacer que te sientas más valiente.`
          },
          { texto: `${this.nombre} habló con su amigo sobre la película y se sintió mejor.`, correcta: true }
        ],
        [
          { texto: `¡Bien hecho, ${this.nombre}!`, correcta: true }
        ]
      ],
      asco: [
        [
          {
            texto: `${this.nombre} se negó a probar la comida y se fue.`,
            correcta: false,
            reflexion: `No probar comida diferente puede hacer que te pierdas de cosas que podrían gustarte. Intentar probar un poco puede ser una buena idea.`
          },
          { texto: `${this.nombre} decidió probar la comida.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} tiró su almuerzo y no comió nada.`,
            correcta: false,
            reflexion: `Reaccionar así no es neseario, puedes decirle a un adulto y pedir otro almuerzo puede resolver el problema.`
          },
          { texto: `${this.nombre} informó a su maestro sobre el animalito y obtuvo un nuevo almuerzo.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} dijo que no limpiaría y se fue.`,
            correcta: false,
            reflexion: `Evitar las tareas desagradables puede hacerlas más difíciles. Enfrentarlas con rapidez puede hacer que terminen más rápido.`
          },
          { texto: `${this.nombre} usó guantes y limpió rápidamente la basura.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se burló del animal y se alejó.`,
            correcta: false,
            reflexion: `Burlarse de algo o alguien no es una bueno. Aprender sobre los animales puede ayudarte a entender y apreciar sus características.`
          },
          { texto: `${this.nombre} decidió observar al animalito más de cerca y aprendió sobre él.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} cerró el refrigerador y se negó a comer en casa.`,
            correcta: false,
            reflexion: `Ignorar la comida echada a perder puede ser peligroso. Informar a un adulto y tirarla es lo correcto para mantener la seguridad.`
          },
          { texto: `${this.nombre} informó a sus padres y juntos tiraron la comida echada a perder.`, correcta: true }
        ],
        [
          { texto: `¡Gran trabajo, ${this.nombre}!`, correcta: true }
        ]
      ],
      tristeza: [
        [
          {
            texto: `${this.nombre} decidió quedarse en casa y no hizo nada.`,
            correcta: false,
            reflexion: `Quedarse solo cuando te sientes triste puede hacer que te sientas peor. Salir y hacer actividades con amigos puede mejorar como te sientes.`
          },
          { texto: `${this.nombre} decidió salir a buscar a su mascota con sus amigos.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se enojó con sus amigos por no lo invitaron.`,
            correcta: false,
            reflexion: `Enojarse con tus amigos puede empeorar tus sentimientos de tristeza. Hablar con ellos y expresar cómo te sientes puede ayudarte a sentirte mejor.`
          },
          { texto: `${this.nombre} se unió a sus amigos y les contó lo que le preocupa.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} decidió no prestar atención en clase.`,
            correcta: false,
            reflexion: `No concentrarte en clase puede afectar tu aprendizaje. Hablar con un maestro o amigo sobre lo que te preocupa puede ayudarte a concentrarte mejor.`
          },
          { texto: `${this.nombre} le contó a su maestro lo que le estaba pasando.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} se enojó y rompió la carta.`,
            correcta: false,
            reflexion: `Reaccionar con enojo ante la amabilidad de los demás puede lastimar sus sentimientos. Aceptar el apoyo puede ayudarte a sentirte mejor.`
          },
          { texto: `${this.nombre} agradeció la carta y se sintió un poco mejor.`, correcta: true }
        ],
        [
          {
            texto: `${this.nombre} perdió la esperanza y dejó de buscar.`,
            correcta: false,
            reflexion: `Rendirse puede hacer que te sientas aún más triste. Continuar con la búsqueda y tener esperanza puede llevarte a un resultado positivo.`
          },
          { texto: `${this.nombre} sigió buscando a su mascota con la ayuda de sus amigos.`, correcta: true }
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
        '../../../../assets/img/hist/alegria/1.jpg',
        '../../../../assets/img/hist/alegria/2.jpg',
        '../../../../assets/img/hist/alegria/3.jpg',
        '../../../../assets/img/hist/alegria/4.jpg',
        '../../../../assets/img/hist/alegria/5.jpg',
        '../../../../assets/img/hist/alegria/6.jpg'
      ],
      miedo: [
        '../../../../assets/img/hist/miedo/1.jpg',
        '../../../../assets/img/hist/miedo/2.jpg',
        '../../../../assets/img/hist/miedo/3.jpg',
        '../../../../assets/img/hist/miedo/4.jpg',
        '../../../../assets/img/hist/miedo/5.jpg',
        '../../../../assets/img/hist/miedo/6.jpg'
      ],
      asco: [
        '../../../../assets/img/hist/asco/1.jpg',
        '../../../../assets/img/hist/asco/2.jpg',
        '../../../../assets/img/hist/asco/3.jpg',
        '../../../../assets/img/hist/asco/4.jpg',
        '../../../../assets/img/hist/asco/5.jpg',
        '../../../../assets/img/hist/asco/6.jpg'
      ],
      tristeza: [
        '../../../../assets/img/hist/tristeza/1.jpg',
        '../../../../assets/img/hist/tristeza/2.jpg',
        '../../../../assets/img/hist/tristeza/3.jpg',
        '../../../../assets/img/hist/tristeza/4.jpg',
        '../../../../assets/img/hist/tristeza/5.jpg',
        '../../../../assets/img/hist/tristeza/6.jpg'
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
      this.feedbackImage = '../../../../assets/img/respuestas/good.png';
      this.showFeedback = true;

      this.pasoActual++;
      if (this.pasoActual < this.historias[this.emocion].length) {

        setTimeout(() => {
          this.showFeedback = false;
        }, 2000);

        this.actualizarHistoria();
      } else {
        this.mostrarFin = true;
      }
    } else {
      this.reflexionActual = opcionElegida.reflexion || 'Reflexiona sobre por qué esta opción no es la mejor.';
      this.mostrarOpciones = true;
      this.mostrarModal();
    }
  }

  regresar() {
    this.mostrarError = false;
    this.mostrarOpciones = true;
  }


  mostrarModal():void{
      const modal = new bootstrap.Modal(document.getElementById('errorModal'));
      modal.show();
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