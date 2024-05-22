import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesAsignadosComponent } from './pacientes-asignados.component';

describe('PacientesAsignadosComponent', () => {
  let component: PacientesAsignadosComponent;
  let fixture: ComponentFixture<PacientesAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesAsignadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacientesAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
