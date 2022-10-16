import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-seguimiento',
  templateUrl: './modal-seguimiento.component.html',
  styleUrls: ['./modal-seguimiento.component.css']
})
export class ModalSeguimientoComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalSeguimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  comentarios: any = [];

  form = new FormGroup({
    estado: new FormControl(''),
    observacion: new FormControl(''),
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
}
