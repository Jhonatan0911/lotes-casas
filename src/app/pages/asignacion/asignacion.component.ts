import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/components/baseComponent';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAsignacionComponent } from 'src/app/components/modal-asignacion/modal-asignacion.component';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent extends BaseFormComponent implements OnInit {

  table: LocalDataSource = new LocalDataSource;
  actions = {
    columnTitle: 'Asignar',
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
    editButtonContent: 'Asignar',
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

}
