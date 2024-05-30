/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstadisticaActividadService } from './estadistica-actividad.service';

describe('Service: EstadisticaActividad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadisticaActividadService]
    });
  });

  it('should ...', inject([EstadisticaActividadService], (service: EstadisticaActividadService) => {
    expect(service).toBeTruthy();
  }));
});
