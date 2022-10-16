import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent extends BaseFormComponent implements OnInit {

  constructor(
    private ErrorService: ErrorService,
    public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  form = new FormGroup({
    nombre: new FormControl(''),
    rol: new FormControl(''),
    correo: new FormControl(''),
    contraseña: new FormControl(''),
  })

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
    }
  }

  validate(nameInput: string) {
    return this.ErrorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.ErrorService.checkInput(this.form, nameInput);
  }
}
