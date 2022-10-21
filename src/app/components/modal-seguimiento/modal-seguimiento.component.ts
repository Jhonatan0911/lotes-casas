import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorService } from 'src/app/services/error.service';
import { CombosService } from 'src/app/services/combos.service';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { ComboText } from 'src/app/models/combos/combo';

@Component({
  selector: 'app-modal-seguimiento',
  templateUrl: './modal-seguimiento.component.html',
  styleUrls: ['./modal-seguimiento.component.css']
})
export class ModalSeguimientoComponent extends BaseFormComponent implements OnInit {

  estados: ComboText[] = [];

  constructor(
    private ErrorService: ErrorService,
    private toastService: ToastService,
    private CombosService: CombosService,
    private SeguimientoService: SeguimientoService,
    public dialogRef: MatDialogRef<ModalSeguimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  comentarios: any = [];

  form = new FormGroup({
    ClienteId: new FormControl(''),
    Descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
      Validators.pattern(this.latin)]),
    EstadoId: new FormControl('',Validators.required),
  })

  ngOnInit(): void {
    console.log(this.data);
    this.form.controls['ClienteId'].setValue(this.data.data.id);
    this.cargaEstados();
    this.cargarComentarios();
  }

  cargaEstados() {
    this.loadingMain = true;
    this.CombosService.getEstados().subscribe({
      next: (req) => {
        this.estados = req;
        this.loadingMain = false;
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
        this.loadingMain = false;
      }
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      this.form.disable()

      this.SeguimientoService.create(this.form.value).subscribe({
        next: (req) => {
          console.log(req)
          this.loading = false;
          this.toastService.showToast('Creado Correctamente');
        },
        error: (err: string) => {
          console.log(err)
          this.loading = false;
          this.form.enable();
          this.toastService.showToast(err, 'error');
        },
        complete: () => {
          this.loading = false;
          this.form.reset();
          this.form.enable();
          this.cargarComentarios();
        },
      });
    }
  }

  cargarComentarios() {
    this.loadingMain = true;
    let object: any = {
      ClienteId: this.data.data.id
    }
    console.log(object)
    this.SeguimientoService.consultar(object).subscribe({
      next: (req) => {
        this.comentarios = req;
        this.loadingMain = false;
      },
      error: (err: string) => {
        console.log(err)
        this.loadingMain = false;
        this.toastService.showToast(err, 'error');
      },
      complete: () => {
        this.loadingMain = false;
      },
    });
  }

  validate(nameInput: string) {
    return this.ErrorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.ErrorService.checkInput(this.form, nameInput);
  }
}
