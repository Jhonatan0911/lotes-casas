import { Injectable, Inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class Interceptor implements HttpInterceptor {
  constructor(
    public cookieService: CookieService,
    private router: Router,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("tokens") ?? "";
    let request = req;
    if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
    }

    return next.handle(request).pipe(

      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl("/login");
        }
        if (err.status === 403) {
          this.router.navigateByUrl("/login");
        }
        return throwError(err);
      })
    );
  }
}
