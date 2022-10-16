import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAsesorComponent } from './seguimiento-asesor.component';

describe('SeguimientoAsesorComponent', () => {
  let component: SeguimientoAsesorComponent;
  let fixture: ComponentFixture<SeguimientoAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoAsesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
