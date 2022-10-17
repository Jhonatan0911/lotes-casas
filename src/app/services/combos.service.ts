import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ComboText } from '../models/combos/combo';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CombosService extends BaseService {
  private apiUrl: string = '/api/combos/';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getOrigenes(): Observable<ComboText[]> {
    return this.http
      .get<ComboText[]>(this._baseUrl + this.apiUrl + "origenes")
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de origenes');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  getProyectos(): Observable<ComboText[]> {
    return this.http
      .get<ComboText[]>(this._baseUrl + this.apiUrl + "proyectos")
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de proyectos');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  getEstados(): Observable<ComboText[]> {
    return this.http
      .get<ComboText[]>(this._baseUrl + this.apiUrl + "estados")
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de estados');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
