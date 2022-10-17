import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/components/baseComponent';
import { ToastService } from 'src/app/services/toast.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void { }

  login() {
    if (this.form.valid) {
      this.loadingMain = true;

      this.LoginService.login(this.form.value).subscribe({
        next: (req) => {
          this.LoginService.setToken(req);
            this.router.navigate(["/"]);
        },
        error: (err: string) => {
          this.ToastService.showToast(err, 'error');
          this.loadingMain = false
        },
        complete: () => this.loadingMain = false
      })
    }
  }

}
