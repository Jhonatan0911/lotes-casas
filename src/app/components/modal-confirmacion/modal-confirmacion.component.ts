import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<ModalConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  observation: String = "";

  ngOnInit(): void {
  }

  close(): void {
    this.dialog.close(false);
  }
  confirm(): void {
    this.dialog.close(true);
  }

}
