import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AltaPacienteComponent } from './components/alta-paciente/alta-paciente.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AuxCheckComponent } from './components/display-mode/aux-check.component';
import { InicioComponent } from './components/inicio/inicio.component';
import 'bootstrap';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule
            ,AltaPacienteComponent
            ,HeaderComponent,FooterComponent,AuxCheckComponent, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent{
  title="TEApp"
}
