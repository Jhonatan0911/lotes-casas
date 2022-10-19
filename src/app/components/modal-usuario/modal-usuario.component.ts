import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { CombosService } from 'src/app/services/combos.service';
import { ComboText } from 'src/app/models/combos/combo';
import { ToastService } from 'src/app/services/toast.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent extends BaseFormComponent implements OnInit {

  perfiles: ComboText[] = [];

  constructor(
    private combosService: CombosService,
    private UsuariosService: UsuariosService,
    private toastService: ToastService,
    private ErrorService: ErrorService,
    public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  form = new FormGroup({
    NombreCompleto: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(this.latin)]
    ),
    Usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(this.latin)]
    ),
    Clave: new FormControl(''),
    Correo: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.email]
    ),
    PerfilId: new FormControl(''),
  })

  ngOnInit(): void {
    console.log(this.data)
    this.form.controls['PerfilId'].setValue(this.data.rol);

    this.cargaPerfiles();
    if (this.data.editMode) {
      this.form.patchValue({
        NombreCompleto: this.data.data.name,
        Usuario: this.data.data.user,
        Clave: this.data.data.contraseña,
        Correo: this.data.data.email,
        PerfilId: this.data.data.perfil,
      });
    }
  }

  cargaPerfiles() {
    this.loadingMain = true;
    this.combosService.getPerfiles().subscribe({
      next: (req) => {
        this.perfiles = req;
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
      this.loadingMain = true;
      this.form.disable()

      this.UsuariosService.create(this.form.value).subscribe({
        next: (req) => {
          console.log(req)
          this.loadingMain = false;
          this.toastService.showToast('Creado Correctamente');
        },
        error: (err: string) => {
          console.log(err)
          this.loadingMain = false;
          this.form.enable();
          this.toastService.showToast(err, 'error');
        },
        complete: () => {
          this.loadingMain = false;
          this.form.reset();
          this.form.enable();
          this.dialogRef.close(true);
        },
      });
    }
  }

  eliminar() {
    this.loadingMain = true;
    this.form.disable()

    let object: any = {
      id: this.data.data.id
    }
    console.log(object)
    this.UsuariosService.desactivar(object).subscribe({
      next: (req) => {
        console.log(req)
        this.loadingMain = false;
        this.toastService.showToast('Creado Correctamente');
      },
      error: (err: string) => {
        console.log(err)
        this.loadingMain = false;
        this.form.enable();
        this.toastService.showToast(err, 'error');
      },
      complete: () => {
        this.loadingMain = false;
        this.form.reset();
        this.form.enable();
        this.dialogRef.close(true);
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
