import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ToastService } from 'src/app/services/toast.service';
import { CombosService } from 'src/app/services/combos.service';
import { ComboText } from 'src/app/models/combos/combo';
import { ModalOrigenComponent } from 'src/app/components/modal-origen/modal-origen.component';
import { ModalProyectoComponent } from 'src/app/components/modal-proyecto/modal-proyecto.component';
import { ModalConfirmacionComponent } from 'src/app/components/modal-confirmacion/modal-confirmacion.component';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: ComboText[] = [];

  table: LocalDataSource = new LocalDataSource;
  actions = {
    columnTitle: 'Eliminar',
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
    editButtonContent: 'Eliminar',
  }

  loadingMain = false;

  settings = {
    mode: 'external',
    noDataMessage: 'Tabla sin registros',
    actions: this.actions,
    pager: this.pager,
    columns: {
      descripcion: {
        title: 'Descripcion'
      }
    },
    edit: this.edit
  };

  constructor(
    public dialog: MatDialog,
    private CombosService: CombosService,
    private toastService: ToastService,
  ) { }


  ngOnInit(): void {
    this.cargaProyectos();
  }


  openModal() {
    const dialogRef = this.dialog.open(ModalProyectoComponent, {
      disableClose: true,
      width: '600px',
      data: {
        label: "Crear",
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

  cargaProyectos() {
    this.loadingMain = true;
    this.CombosService.getProyectos().subscribe({
      next: (req: any[]) => {

        this.proyectos = req;
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
          descripcion: response?.Descripcion,
        }
      );
    })
    this.table = new LocalDataSource(dataUser);
    this.loadingMain = false;
  }

  eliminar(row: any){
    console.log(row)
    this.dialog.open(ModalConfirmacionComponent, {
      disableClose: true,
      width: '300px',
      data: {message: '¿Estas seguro de eliminar el proyecto: ' + row.data.descripcion + '?'}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        let object = {
          Id: row.data.id
        }
        this.CombosService.deleteProyectos(object).subscribe({
          next: (req: any) => {
            this.cargaProyectos();
          },
          error: (err: string) => {
            this.toastService.showToast(err, 'error');
          }
        });;
      }
    });
  }
}
