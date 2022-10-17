import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { BaseService } from './baseService';
import { MainForm } from '../models/main/formMain';

@Injectable({
  providedIn: 'root'
})
export class MainFormService extends BaseService {
  private apiUrl: string = '/api/clientes/crear';
  constructor(@Inject('UrlApi') baseUrl: string, private http: HttpClient) {
    super(baseUrl);
  }

  create(data: MainForm): Observable<MainForm> {
    return this.http
      .post<MainForm>(this._baseUrl + this.apiUrl, data)
      .pipe(
        map((response) => response),
        tap((a) => {
          this.logs('crear registro de form Principal');
          this.logs(a);
        }),
        catchError(this.errorMgmt)
      );
  }
}
