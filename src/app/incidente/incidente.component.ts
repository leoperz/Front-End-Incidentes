import { Component, Injectable, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Incidente} from '../modelos/incidente';
import {DatabaseService} from '../providers/database.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalContent} from '../inicio/inicio.component';


//Definimos el cambio de las palabras del DatePicker

const I18N_VALUES = {
  es: {
    weekdays: ['Lu', 'Ma', 'Mie', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
 
};



@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}

//Definimos el modal para poder mostrar los mensajes.








@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider
})


export class IncidenteComponent  {
model: NgbDateStruct;
form: FormGroup;
  constructor(private fb :FormBuilder, private _i18n: I18n, private _db : DatabaseService,
              private modal:NgbModal) {

    this.form = fb.group({
      
      'descripcion':[null, Validators.required],
      'numero':[null],
      'titulo':[null],
      'fecha':[null],
      
      'estado':[null]
    });
   }


   set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }

  

  private open(mensaje){
    const modalRef = this.modal.open(NgbdModalContent);
    modalRef.componentInstance.name = mensaje;
}


  guardarIncidente(form:any){
    let incidente = new Incidente();
    incidente.descripcion = form.descripcion;
    incidente.estado = form.estado;
    incidente.fechaAlta = form.fecha;
    incidente.numeroSprint = form.numero;
    incidente.tituloSprint = form.titulo;
    console.log(incidente);
    this._db.guardarIncidente(incidente).subscribe(
      res=>{
        this.open("Se ha dado de alta un nuevo incidente");
        this.form.reset();
      },
      error=>{
        console.log('anduvo como el orto');
      }
    );
  }

 

}
