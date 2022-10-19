import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunLayoutComponent } from './comun-layout.component';

describe('ComunLayoutComponent', () => {
  let component: ComunLayoutComponent;
  let fixture: ComponentFixture<ComunLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComunLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
