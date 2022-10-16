import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-asignacion',
  templateUrl: './modal-asignacion.component.html',
  styleUrls: ['./modal-asignacion.component.css']
})
export class ModalAsignacionComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  form = new FormGroup({
    asesor: new FormControl(''),
    projecto: new FormControl(''),
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
