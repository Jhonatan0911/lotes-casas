import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { AsignacionComponent } from './pages/asignacion/asignacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MaterialModule } from './material/material.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalAsignacionComponent } from './components/modal-asignacion/modal-asignacion.component';
import { SeguimientoAsesorComponent } from './pages/seguimiento-asesor/seguimiento-asesor.component';
import { ModalSeguimientoComponent } from './components/modal-seguimiento/modal-seguimiento.component';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { Interceptor } from './security/Interceptors';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { OrigenesComponent } from './pages/origenes/origenes.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ComunLayoutComponent } from './layouts/comun-layout/comun-layout.component';
import { ModalOrigenComponent } from './components/modal-origen/modal-origen.component';
import { ModalProyectoComponent } from './components/modal-proyecto/modal-proyecto.component';
import { EstadosComponent } from './pages/estados/estados.component';
import { ModalEstadoComponent } from './components/modal-estado/modal-estado.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SeguimientoComponent,
    AsignacionComponent,
    MainLayoutComponent,
    ModalAsignacionComponent,
    SeguimientoAsesorComponent,
    ModalSeguimientoComponent,
    ModalUsuarioComponent,
    UsuariosComponent,
    LoginComponent,
    ModalConfirmacionComponent,
    OrigenesComponent,
    ProyectosComponent,
    ComunLayoutComponent,
    ModalOrigenComponent,
    ModalProyectoComponent,
    EstadosComponent,
    ModalEstadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
