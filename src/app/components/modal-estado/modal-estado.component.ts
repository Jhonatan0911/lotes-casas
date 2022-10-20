import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { CombosService } from 'src/app/services/combos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modal-estado',
  templateUrl: './modal-estado.component.html',
  styleUrls: ['./modal-estado.component.css']
})
export class ModalEstadoComponent extends BaseFormComponent implements  OnInit {

  constructor(
    private combosService: CombosService,
    private toastService: ToastService,
    private ErrorService: ErrorService,
    public dialogRef: MatDialogRef<ModalEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  form = new FormGroup({
    Descripcion: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(this.latin)]
    )
  })


  ngOnInit(): void {
  }

  onClose(estado: boolean): void {
    this.dialogRef.close(estado);
  }

  submit() {
    if (this.form.valid) {
      this.form.disable()

      this.combosService.createEstados(this.form.value).subscribe({
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
          this.dialogRef.close(true);
        },
      });
    }
  }

  validate(nameInput: string) {
    return this.ErrorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.ErrorService.checkInput(this.form, nameInput);
  }
}
