import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { ModalConfirmacionComponent } from 'src/app/components/modal-confirmacion/modal-confirmacion.component';
import { LoginService } from 'src/app/services/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

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
    private LoginService: LoginService
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
        this.router.navigateByUrl("/login");
      }
    });
  }

}
