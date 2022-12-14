import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from './baseService';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService extends BaseService {
  private apiUrl: string = '/api/clientes/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  asignar(data:any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "asignar", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Asignar proyecto a un asesor');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  reasignar(data:any): Observable<any> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "reasignar", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('Reasignar proyecto a un asesor');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
