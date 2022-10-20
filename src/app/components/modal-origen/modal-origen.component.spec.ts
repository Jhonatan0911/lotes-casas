import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrigenComponent } from './modal-origen.component';

describe('ModalOrigenComponent', () => {
  let component: ModalOrigenComponent;
  let fixture: ComponentFixture<ModalOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrigenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
