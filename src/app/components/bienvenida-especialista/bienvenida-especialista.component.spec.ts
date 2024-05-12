import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaEspecialistaComponent } from './bienvenida-especialista.component';

describe('BienvenidaEspecialistaComponent', () => {
  let component: BienvenidaEspecialistaComponent;
  let fixture: ComponentFixture<BienvenidaEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidaEspecialistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BienvenidaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
