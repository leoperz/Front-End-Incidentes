import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DatabaseService} from './providers/database.service';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalContent} from './inicio/inicio.component';
import { IncidenteComponent } from './incidente/incidente.component';
import { ListaincidentesComponent } from './listaincidentes/listaincidentes.component';
import { PerfilComponent } from './perfil/perfil.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';




@NgModule({
  declarations: [
    AppComponent,
     InicioComponent,
    NgbdModalContent,
    IncidenteComponent,
    ListaincidentesComponent,
    PerfilComponent
  
  ],
  
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule
    


   
  ],
 

  providers: [DatabaseService],

  bootstrap: [AppComponent],

  entryComponents:[NgbdModalContent]
})
export class AppModule { }
