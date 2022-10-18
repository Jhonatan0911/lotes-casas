import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ComboText } from '../models/combos/combo';
import { BaseService } from './baseService';
import { tablaProyecto } from '../models/Proyecto/Proyecto';
import { Paginacion } from '../models/paginacion/paginacion';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService extends BaseService {
  private apiUrl: string = '/api/clientes';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  getProyectos(pag: Paginacion): Observable<tablaProyecto> {
    return this.http
      .post<tablaProyecto>(this._baseUrl + this.apiUrl, pag)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('consulta de origenes');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
