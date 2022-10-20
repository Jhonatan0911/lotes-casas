import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ToastService } from 'src/app/services/toast.service';
import { CombosService } from 'src/app/services/combos.service';
import { ComboText } from 'src/app/models/combos/combo';
import { ModalOrigenComponent } from 'src/app/components/modal-origen/modal-origen.component';
import { ModalConfirmacionComponent } from 'src/app/components/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-origenes',
  templateUrl: './origenes.component.html',
  styleUrls: ['./origenes.component.css']
})
export class OrigenesComponent implements OnInit {

  origenes: ComboText[] = [];

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
    this.cargaOrigenes();
  }


  openModal() {
    const dialogRef = this.dialog.open(ModalOrigenComponent, {
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
    this.cargaOrigenes();
  }

  cargaOrigenes() {
    this.loadingMain = true;
    this.CombosService.getOrigenes().subscribe({
      next: (req: ComboText[]) => {

        this.origenes = req;
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
    this.origenes.forEach((response:any) => {
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
      data: {message: '¿Estas seguro de eliminar el origen: ' + row.data.descripcion + '?'}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.CombosService.deleteProyectos({Id: row.data.id});
        this.cargaOrigenes();
      }
    });
  }

}
