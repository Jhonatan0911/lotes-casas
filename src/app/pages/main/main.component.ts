import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/components/baseComponent';
import { CombosService } from 'src/app/services/combos.service';
import { ComboText } from 'src/app/models/combos/combo';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseFormComponent implements OnInit {

  proyectos: ComboText[] = [];
  origenes: ComboText[] = [];

  form = new FormGroup({
    NombreCompleto: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(this.latin)]
    ),
    Correo: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.email]
    ),
    Telefono: new FormControl('',[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15),
      Validators.pattern(this.number)]
    ),
    ProyectoId: new FormControl('',[
      Validators.required]
    ),
    OrigenId: new FormControl('',[
      Validators.required]
    ),

  })

  constructor(
    private combosService: CombosService,
    private errorService: ErrorService,
    private toastService: ToastService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.cargaProyectos();
    this.cargaOrigenes();
  }

  cargaProyectos(){
    this.combosService.getProyectos().subscribe({
      next: (req) => {
        this.proyectos = req;
        this.loadingMain = false;
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
      }
    });
  }

  cargaOrigenes(){
    this.combosService.getOrigenes().subscribe({
      next: (req) => {
        this.origenes = req;
        this.loadingMain = false;
      },
      error: (err: string) => {
        this.toastService.showToast(err, 'error');
      }
    });
  }


  validate(nameInput: string) {
    return this.errorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.errorService.checkInput(this.form, nameInput);
  }

  submit(){

  }

}
