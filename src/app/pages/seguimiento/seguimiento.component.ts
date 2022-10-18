import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/components/baseComponent';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAsignacionComponent } from 'src/app/components/modal-asignacion/modal-asignacion.component';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { tablaProyecto } from 'src/app/models/Proyecto/Proyecto';
import { ToastService } from 'src/app/services/toast.service';
import { Paginacion } from 'src/app/models/paginacion/paginacion';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent extends BaseFormComponent implements OnInit {

  segumiento : boolean = true;
  comentarios: any = [];
  proyectos!: any;


  table: LocalDataSource = new LocalDataSource;
  actions = {
    columnTitle: 'Reasignar',
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
    editButtonContent: 'Reasignar',
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
      },
      segumiento: {
        title: 'Último seguimiento'
      },
      asesor: {
        title: 'Asesor'
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
    const dialogRef = this.dialog.open(ModalAsignacionComponent, {
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

  }

  cargaProyectos(){
    let paginacion : Paginacion = {
      page: 1,
      limit: 1,
    }
    this.ProyectosService.getProyectos(paginacion).subscribe({
      next: (req: any) => {
        this.proyectos = req.rows.filter((project:any) => project.AsesorId != null)
        this.loadingMain = false;
        this.createTable();
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
      }
    });
  }

  createTable() {
    this.table = new LocalDataSource;
    let dataUser: any = [];
    this.proyectos.forEach((response:any) => {
      dataUser.push(
        {
          id: response?.Id,
          name: response?.NombreCompleto,
          phone: response?.Telefono,
          email: response?.Correo,
          project: response?.Proyecto.Descripcion,
          seguimiento: response?.Proyecto.FechaModificacion,
          asesor: response?.Asesor.NombreCompleto,
          asesorJoin: response?.Asesor,
        }
      );
    })
    this.table = new LocalDataSource(dataUser);
  }

  viewSeguimiento(data: any){
    this.segumiento = true;
  }

}
