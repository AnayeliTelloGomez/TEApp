import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nombre-captura',
  standalone: true,
  imports: [
    MatIconModule,MatDividerModule,MatButtonModule,MatGridListModule, 
    FormsModule,CommonModule
  ],
  templateUrl: './nombre-captura.component.html',
  styleUrl: './nombre-captura.component.css'
})
export class NombreCapturaComponent implements OnInit {
  nombre: string = '';
  nombreCapturado: boolean = false;
  emocion: string = '';
  idact: number = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.emocion = params.get('emotion') || 'Enojo';
      this.idact = Number(params.get('idact')) || 1;
      console.log(this.idact);
    });

  }

  capturarNombre() {
    if (this.nombre.trim()) {
      localStorage.setItem('nombre', this.nombre);
      this.router.navigate(['/activity5', this.emocion, this.idact]);
    }
  }
}
