import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { ModalConfirmacionComponent } from 'src/app/components/modal-confirmacion/modal-confirmacion.component';
import { LoginService } from 'src/app/services/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-asesor-layout',
  templateUrl: './asesor-layout.component.html',
  styleUrls: ['./asesor-layout.component.css']
})
export class AsesorLayoutComponent implements OnInit {

  user: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    public LoginService: LoginService
  ) { }

  rol: any = "admin";


  ngOnInit(): void {
  }


  getUser() {
    this.user = localStorage.getItem("name");
  }

  logout(){
    this.dialog.open(ModalConfirmacionComponent, {
      disableClose: true,
      width: '300px',
      data: {message: '¿Estas seguro de cerrar sesion?'}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.LoginService.deleteToken();
        this.LoginService.rol = "";
        this.LoginService.nombre = "";
        this.router.navigateByUrl("/");
      }
    });
  }

}
