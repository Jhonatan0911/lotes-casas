import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ComunLayoutComponent } from './layouts/comun-layout/comun-layout.component';

//pages
import { MainComponent } from './pages/main/main.component';
import { AsignacionComponent } from './pages/asignacion/asignacion.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { SeguimientoAsesorComponent } from './pages/seguimiento-asesor/seguimiento-asesor.component';
import { LoginComponent } from './pages/login/login.component';
import { Acceso } from './security/acceso';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { OrigenesComponent } from './pages/origenes/origenes.component';
import { EstadosComponent } from './pages/estados/estados.component';

const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
    ]
  },
  { path: '',
    component: ComunLayoutComponent,
    children: [
      { path: 'main', component: MainComponent }
    ],
    canActivate: [Acceso]
  },
  { path: '',
    component: ComunLayoutComponent,
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'proyectos', component: ProyectosComponent },
      { path: 'origenes', component: OrigenesComponent },
      { path: 'estados', component: EstadosComponent },
    ],
    canActivate: [Acceso]
  },
  { path: '',
    component: ComunLayoutComponent,
    children: [
      { path: 'asignar', component: AsignacionComponent },
      { path: 'seguimiento', component: SeguimientoComponent },
    ],
    canActivate: [Acceso]
  },
  { path: '',
    component: ComunLayoutComponent,
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
