import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteLayoutComponent } from './gerente-layout.component';

describe('GerenteLayoutComponent', () => {
  let component: GerenteLayoutComponent;
  let fixture: ComponentFixture<GerenteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
