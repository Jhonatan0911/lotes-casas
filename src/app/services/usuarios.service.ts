import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ComboText } from '../models/combos/combo';
import { BaseService } from './baseService';
import { tablaProyecto } from '../models/Proyecto/Proyecto';
import { Paginacion } from '../models/paginacion/paginacion';
import { Usuario } from '../models/Usuarios/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseService {
  private apiUrl: string = '/api/usuarios';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(this._baseUrl + this.apiUrl)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de usarios');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }

  create(data: any): Observable<Usuario[]> {
    return this.http
      .post<any>(this._baseUrl + this.apiUrl + "/registrar", data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear usario');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
