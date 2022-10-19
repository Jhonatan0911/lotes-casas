import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from './baseService';
@Injectable({
  providedIn: 'root'
})
export class SeguimientoService extends BaseService {
  private apiUrl: string = '/api/seguimiento/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  create(data:any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "agregar", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Asignar seguimiento');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  consultar(data:any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "consultar", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('ver seguimientos');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
