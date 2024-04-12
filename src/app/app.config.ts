import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
//para usar httpClient
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule),]
};
