import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';//para hacer las peticiones http
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AuxCheckComponent } from './components/display-mode/aux-check.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { Activity1Component } from './components/juegos/activity-1/activity-1.component';
import { PruebaComponent } from './components/juegos/prueba/prueba.component';
import 'bootstrap';
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';//crear rutas para los componentes

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive//crear rutas para los componentes
            ,HttpClientModule//peticiones http
            ,AltaUsuarioComponent,HeaderComponent,FooterComponent,AuxCheckComponent, InicioComponent,Activity1Component,PruebaComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent{
  title="TEApp"
}
