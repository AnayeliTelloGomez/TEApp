import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';//para hacer las peticiones http
import { AltaPacienteComponent } from './components/alta-paciente/alta-paciente.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AuxCheckComponent } from './components/display-mode/aux-check.component';
import { InicioComponent } from './components/inicio/inicio.component';
import 'bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';//crear rutas para los componentes

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive//crear rutas para los componentes
            ,HttpClientModule//peticiones http
            ,AltaPacienteComponent,HeaderComponent,FooterComponent,AuxCheckComponent, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent{
  title="TEApp"
}
