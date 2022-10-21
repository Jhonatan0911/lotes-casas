import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ComboText } from '../models/combos/combo';
import { BaseService } from './baseService';

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

  createOrigenes(data: {Descripcion: string}): Observable<ComboText[]> {
    return this.http
      .post<ComboText[]>(this._baseUrl + this.apiUrl + "origenes/crear", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear origen');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  deleteOrigenes(data: any): Observable<any> {
    return this.http
      .delete<any>(this._baseUrl + this.apiUrl + "origenes/eliminar", { body: data })
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('eliminar origen');
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

  createProyectos(data: {Descripcion: string}): Observable<ComboText[]> {
    return this.http
      .post<ComboText[]>(this._baseUrl + this.apiUrl + "proyectos/crear", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear proyecto');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  deleteProyectos(data: any): Observable<any> {
    return this.http
      .delete<any>(this._baseUrl + this.apiUrl + "proyectos/eliminar", { body: data })
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('eliminar proyecto');
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

  createEstados(data: {Descripcion: string}): Observable<ComboText[]> {
    return this.http
      .post<ComboText[]>(this._baseUrl + this.apiUrl + "estados/crear", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear estados');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  deleteEstados(data: any): Observable<any> {
    return this.http
      .delete(this._baseUrl + this.apiUrl + "estados/eliminar",{ body: data } )
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('eliminar estados');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  getPerfiles(): Observable<ComboText[]> {
    return this.http
      .get<ComboText[]>(this._baseUrl + "/api/usuarios/perfiles/")
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de perfiles');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
