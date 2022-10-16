import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/components/baseComponent';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseFormComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(this.latin)]
    ),
    correo: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.email]
    ),
    telefono: new FormControl('',[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15),
      Validators.pattern(this.number)]
    ),
    proyecto: new FormControl('',[
      Validators.required]
    ),

  })

  constructor(
    private ErrorService: ErrorService,
  ) {
    super();
  }

  ngOnInit(): void {
  }


  validate(nameInput: string) {
    return this.ErrorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.ErrorService.checkInput(this.form, nameInput);
  }

  submit(){

  }

}
