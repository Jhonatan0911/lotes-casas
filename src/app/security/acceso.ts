import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { CookieService } from 'ngx-cookie-service';
//import { MenuService } from 'src/app/menu/menu.service';
import { LoginService } from '../services/login.service';



@Injectable({
  providedIn: 'root'
})
export class Acceso implements CanActivate {
  cookieValue = '';
  icon = '';

  public loginId: string = "";
  public _baseUrlLogin: string;

  constructor(private router: Router,
    @Inject('UrlLogin') baseUrlLogin: string,
    public LoginService: LoginService,
    //private m : MenuService
    ) {
    this._baseUrlLogin = baseUrlLogin;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.loginId = this.LoginService.getToken();
    //this.icon = this.loginId.charAt(0)

    //this.m.datos(this.loginId);

    if (this.loginId == "" || this.loginId == undefined) {
      const tree: UrlTree = this.router.parseUrl(this._baseUrlLogin);
      return tree;
    }

    return true;
  }

}
