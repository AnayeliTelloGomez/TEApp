import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreCapturaComponent } from './nombre-captura.component';

describe('NombreCapturaComponent', () => {
  let component: NombreCapturaComponent;
  let fixture: ComponentFixture<NombreCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NombreCapturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NombreCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
