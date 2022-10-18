import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuarios/Usuario';
import { Paginacion } from 'src/app/models/paginacion/paginacion';
import { tablaProyecto } from 'src/app/models/Proyecto/Proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AsignacionService } from 'src/app/services/asignacion.service';

@Component({
  selector: 'app-modal-asignacion',
  templateUrl: './modal-asignacion.component.html',
  styleUrls: ['./modal-asignacion.component.css']
})
export class ModalAsignacionComponent extends BaseFormComponent implements OnInit {

  asesores!: Usuario[];
  proyectos!: tablaProyecto;

  constructor(
    private toastService: ToastService,
    private AsignacionService: AsignacionService,
    private ProyectosService: ProyectosService,
    private UsuariosService: UsuariosService,
    public dialogRef: MatDialogRef<ModalAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  form = new FormGroup({
    Id: new FormControl(''),
    AsesorId: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    console.log(this.data);
    this.form.controls['Id'].setValue(this.data.data.id);
    this.cargaAsesores();
    this.cargaProyectos();
  }

  cargaProyectos(){
    let paginacion : Paginacion = {
      page: 1,
      limit: 10,
    }
    this.ProyectosService.getProyectos(paginacion).subscribe({
      next: (req: tablaProyecto) => {
        this.proyectos = req;
        this.loadingMain = false;
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
      }
    });
  }


  cargaAsesores() {
    this.UsuariosService.getUsuarios().subscribe({
      next: (req: Usuario[]) => {
        this.asesores = req.filter((user:Usuario) => user.PerfilId == 'F95409DA-7DDE-4773-B6E2-281678F77106')
        console.log(this.asesores)
        this.loadingMain = false;
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
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

      if(this.data.data?.asesor){
        this.AsignacionService.reasignar(this.form.value).subscribe({
          next: (req) => {
            console.log(req)
            this.loadingMain = false;
            this.toastService.showToast('Reasignado Correctamente');
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
      }else{
        this.AsignacionService.asignar(this.form.value).subscribe({
          next: (req) => {
            console.log(req)
            this.loadingMain = false;
            this.toastService.showToast('Asignado Correctamente');
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
  }
}
