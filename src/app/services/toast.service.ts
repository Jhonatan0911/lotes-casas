import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) {}

  showToast(sms: string, status: string = 'success') {
    switch (status) {
      case 'error':
        this._snackBar.open(`Error: ` + sms, "", {duration: 5000, panelClass: ['snackbar-error'] } );
        break;
      case 'success':
          this._snackBar.open(sms, "", {duration: 3000 } );
          break;
      default:
        this._snackBar.open(sms , "", {duration: 3000 });
        break;
    }
  }
}
