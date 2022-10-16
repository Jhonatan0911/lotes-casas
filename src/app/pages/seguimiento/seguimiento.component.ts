import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { MatDialog } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/components/baseComponent';
import { ModalAsignacionComponent } from 'src/app/components/modal-asignacion/modal-asignacion.component';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent extends BaseFormComponent implements OnInit {

  segumiento : boolean = true;
  comentarios: any = [];

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
  ) {
    super();
  }

  ngOnInit(): void {
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

  viewSeguimiento(data: any){
    this.segumiento = true;
  }

}
