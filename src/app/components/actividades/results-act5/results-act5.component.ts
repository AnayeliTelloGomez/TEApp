import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-act5',
  standalone: true,
  imports: [],
  templateUrl: './results-act5.component.html',
  styleUrl: './results-act5.component.css'
})
export class ResultsAct5Component implements OnInit {


  correctas: number = 0;
  incorrectas: number = 0;
  tiempo: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as { correctas: number, incorrectas: number, tiempo: number };
      this.correctas = state.correctas;
      this.incorrectas = state.incorrectas;
      this.tiempo = state.tiempo;
    }
  }

  ngOnInit(): void {}

}
