import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/components/baseComponent';
import { ToastService } from 'src/app/services/toast.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ComunLayoutComponent } from 'src/app/layouts/comun-layout/comun-layout.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  constructor(
    private router: Router,
    private LoginService: LoginService,
    private ToastService: ToastService,
  ) {
    super();
   }

  loading: boolean = false;

  form = new FormGroup({
    Usuario: new FormControl('', [Validators.required]),
    Clave: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.LoginService.deleteToken();
   }

  login() {
    if (this.form.valid) {
      this.loading = true;

      this.LoginService.login(this.form.value).subscribe({
        next: (req) => {
          this.LoginService.rol = req.Perfil;
          this.LoginService.nombre = req.NombreCompleto;
          this.LoginService.setToken(req.token);
          switch (req.Perfil) {
            case "Admin":
              this.router.navigate(["/origenes"]);
              break;
            case "Comun":
              this.router.navigate(["/main"]);
              break;
            case "Asesor":
              this.router.navigate(["/asesor"]);
              break;
            case "Gerente":
              this.router.navigate(["/asignacion"]);
              break;
            default:
              break;
          }
        },
        error: (err: string) => {
          this.ToastService.showToast(err, 'error');
          this.loading = false
        },
        complete: () => this.loading = false
      })
    }
  }

}
