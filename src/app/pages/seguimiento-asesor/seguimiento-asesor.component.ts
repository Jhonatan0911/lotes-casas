import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/components/baseComponent';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { MatDialog } from '@angular/material/dialog';
import { ModalSeguimientoComponent } from 'src/app/components/modal-seguimiento/modal-seguimiento.component';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ToastService } from 'src/app/services/toast.service';
import { Paginacion } from 'src/app/models/paginacion/paginacion';
import { tablaProyecto } from 'src/app/models/Proyecto/Proyecto';

@Component({
  selector: 'app-seguimiento-asesor',
  templateUrl: './seguimiento-asesor.component.html',
  styleUrls: ['./seguimiento-asesor.component.css']
})
export class SeguimientoAsesorComponent extends BaseFormComponent implements OnInit {

  proyectos!: tablaProyecto;

  table: LocalDataSource = new LocalDataSource;
  actions = {
    columnTitle: 'Segumiento',
    add: false,
    edit: true,
    delete: false,
    position: 'right'
  }

  pager = {
    display: true,
    perPage: 10,
  }

  edit = {
    editButtonContent: 'Seguimiento',
  }

  settings = {
    mode: 'external',
    noDataMessage: 'Tabla sin registros',
    actions: this.actions,
    pager: this.pager,
    columns: {
      name: {
        title: 'Nombre'
      },
      phone: {
        title: 'Teléfono'
      },
      email: {
        title: 'Correo electronico'
      },
      project: {
        title: 'Proyecto'
      }
      ,
      ultimo: {
        title: 'Ultimo Seguimiento'
      }
      ,
      estado: {
        title: 'Estado'
      }
    },
    edit: this.edit
  };

  constructor(
    public dialog: MatDialog,
    private toastService: ToastService,
    public ProyectosService: ProyectosService
  ) {
    super();
   }

   ngOnInit(): void {
    this.cargaProyectos();
  }

  openModal(data?: any) {
    let editMode = data ? true : false;
    const dialogRef = this.dialog.open(ModalSeguimientoComponent, {
      disableClose: true,
      width: '600px',
      data: {
        data: data?.data,
        editMode: editMode,
        label: editMode ? "Editar" : "Crear",
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.reload();
      }
    });
  }

  reload(){
    this.cargaProyectos();
  }

  cargaProyectos(){
    this.loadingMain = true;
    let paginacion : Paginacion = {
      page: 1,
      limit: 1000,
    }
    this.ProyectosService.getProyectos(paginacion).subscribe({
      next: (req: any) => {
        this.proyectos = req;
        this.createTable();
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
      }
    });
  }

  createTable() {
    console.log(this.proyectos)
    this.table = new LocalDataSource;
    let dataUser: any = [];
    this.proyectos.rows.forEach((response:any) => {
      dataUser.push(
        {
          id: response?.Id,
          name: response?.NombreCompleto,
          phone: response?.Telefono,
          email: response?.Correo,
          project: response?.Proyecto.Descripcion,
        }
      );
    })
    this.table = new LocalDataSource(dataUser);
    this.loadingMain = false;
  }

}
