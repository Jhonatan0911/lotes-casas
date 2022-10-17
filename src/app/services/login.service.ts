import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  private apiUrl: string = '/api/usuarios';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  login(data: any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "/login", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Login');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  setToken(token : string  ){
    localStorage.setItem("tokens", token);
  }

  getToken() {
    return localStorage.getItem("tokens") ?? "";
  }

  deleteToken(){
    localStorage.removeItem("tokens")
  }
}
