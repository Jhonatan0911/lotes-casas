import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let URL = environment.apiUrl; //EXTE

export function getUrlApi() {
  return URL+ "/v1"
}

export function getUrlApiAuth() {
  return URL+ "/v1"
}

export function getUrlLogout() {
  return "login"
}


if (environment.production) {
  enableProdMode();
}

const provider = [
  { provide: "UrlApi", useFactory: getUrlApi, deps: [] },
  { provide: "UrlApiAuth", useFactory: getUrlApiAuth, deps: [] },
  { provide: "UrlLogin", useFactory: getUrlLogout, deps: [] },
];

platformBrowserDynamic(provider).bootstrapModule(AppModule)
  .catch(err => console.error(err));
