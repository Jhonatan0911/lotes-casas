import { Component, OnInit } from '@angular/core';
import { ModalUsuarioComponent } from 'src/app/components/modal-usuario/modal-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Usuario } from 'src/app/models/Usuarios/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios!: Usuario[];
  rol: any;
  type: any;

  table: LocalDataSource = new LocalDataSource;
  actions = {
    columnTitle: 'Editar',
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
    editButtonContent: 'Editar',
  }

  loadingMain = false;

  settings = {
    mode: 'external',
    noDataMessage: 'Tabla sin registros',
    actions: this.actions,
    pager: this.pager,
    columns: {
      name: {
        title: 'Nombre'
      },
      user: {
        title: 'Usuario'
      },
      email: {
        title: 'Correo electronico'
      },
      perfil: {
        title: 'Perfil'
      }
    },
    edit: this.edit
  };

  constructor(
    private ruta: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private UsuariosService: UsuariosService,
    private toastService: ToastService,

  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    if(this.ruta.snapshot.params){
      this.type = this.ruta.snapshot.params?.['type'];
      if(this.type != 'admin' && this.type != 'asesor' && this.type != 'gerente' && this.type != 'comun'){
        this.router.navigate(['main']);
      }
    }
    this.cargaUsuarios();
  }


  openModal(data?: any) {
    let editMode = data ? true : false;
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      width: '600px',
      data: {
        data: data?.data,
        editMode: editMode,
        rol: this.rol,
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
    this.cargaUsuarios();
  }

  cargaUsuarios() {
    this.loadingMain = true;
    this.UsuariosService.getUsuarios().subscribe({
      next: (req: Usuario[]) => {
        if(this.type == 'gerente'){
          this.rol = 'Gerente';
          this.usuarios = req.filter((gerente:any) => gerente.Perfil.Descripcion == 'Gerente')
        }else{
          if(this.type == 'admin'){
            this.rol = 'Administrador';
            this.usuarios = req.filter((admin:any) => admin.Perfil.Descripcion == 'Admin')
          }else{
            if(this.type == 'comun'){
              this.rol = 'Común';
              this.usuarios = req.filter((admin:any) => admin.Perfil.Descripcion == 'Comun')
            }else{
              this.rol = 'Asesor';
              this.usuarios = req.filter((asesor:any) => asesor.Perfil.Descripcion == 'Asesor')
            }
          }
        }
        this.createTable();
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
        this.loadingMain = false;
      }
    });
  }

  createTable() {
    this.table = new LocalDataSource;
    let dataUser: any = [];
    this.usuarios.forEach((response:any) => {
      dataUser.push(
        {
          id: response?.id,
          name: response?.NombreCompleto,
          user: response?.Usuario,
          email: response?.Correo,
          perfil: response?.Perfil.Descripcion,
          perfilId: response?.PerfilId,
          contraseña: response?.Clave,
        }
      );
    })
    this.table = new LocalDataSource(dataUser);
    this.loadingMain = false;
  }

}
