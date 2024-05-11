import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-advertencia-modal',
  standalone: true,
  imports: [],
  templateUrl: './advertencia-modal.component.html',
  styleUrl: './advertencia-modal.component.css'
})
export class AdvertenciaModalComponent {
  @Input() mostrarModal: boolean=false;
  @Output() cerrarModalEmitter = new EventEmitter();

  constructor() { }

  cerrarModal() {
    this.cerrarModalEmitter.emit(true); // Agrega un valor al emit para que funcione correctamente
  }

}
