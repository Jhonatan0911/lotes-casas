import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AsesorLayoutComponent } from './layouts/asesor-layout/asesor-layout.component';
import { GerenteLayoutComponent } from './layouts/gerente-layout/gerente-layout.component';


//pages
import { MainComponent } from './pages/main/main.component';
import { AsignacionComponent } from './pages/asignacion/asignacion.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { SeguimientoAsesorComponent } from './pages/seguimiento-asesor/seguimiento-asesor.component';
import { LoginComponent } from './pages/login/login.component';
import { Acceso } from './security/acceso';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
    ]
  },
  { path: '',
    component: GerenteLayoutComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'usuarios/:type', component: UsuariosComponent },
      { path: 'asignacion', component: AsignacionComponent },
      { path: 'seguimiento', component: SeguimientoComponent },
    ],
    canActivate: [Acceso]
  },
  { path: '',
    component: AsesorLayoutComponent,
    children: [
      { path: 'asesor', component: SeguimientoAsesorComponent },
    ],
    canActivate: [Acceso]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
