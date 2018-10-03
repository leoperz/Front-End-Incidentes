import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../providers/database.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-listaincidentes',
  templateUrl: './listaincidentes.component.html',
  styleUrls: ['./listaincidentes.component.css']
})
export class ListaincidentesComponent implements OnInit {
  flagClickAbiertos;
  flagClickCerrados;
  flagClickResueltos;
  flagClickAsignados;
  flagAbiertos ;
  flagCerrados;
  flagAsignados;
  flagResuelto;
  lista =[];


  constructor(private _db : DatabaseService) { 
    this._db.listarIncidentes().subscribe(
      result=>{
        result.incidentes.forEach(element => {
          this.lista.push(element);
        });
        
       
        
      }
    );
  
    }

  ngOnInit() {
    $(document).ready(function(){
      $('#sidebarCollapse').on('click', function(){
        $('#sidebar').toggleClass('active');
      });
    });
  }

  incidentesAbiertos(){
    let aux = [];
    this.lista.forEach(element => {
      if(element.estado =="Abierto"){
        aux.push(element);
      }
    });
    return aux;
  }


  incidentesCerrados(){
    let aux = [];
    this.lista.forEach(element => {
      if(element.estado =="Cerrado"){
        aux.push(element);
      }
    });
    return aux;
  }



  incidentesAsignados(){
    let aux = [];
    this.lista.forEach(element => {
      if(element.estado =="Asignado"){
        aux.push(element);
      }
    });
    return aux;
  }


  incidentesResueltos(){
    let aux = [];
    this.lista.forEach(element => {
      if(element.estado =="Resuelto"){
        aux.push(element);
      }
    });
    
    return aux;
  }

  clickAbiertos(){
    this.flagClickAbiertos=true;
    this.flagClickAsignados=false;
    this.flagClickCerrados=false;
    this.flagClickResueltos=false;
    if(this.incidentesAbiertos().length >0){
        this.flagAbiertos = true;
        this.flagCerrados = false;
        this.flagAsignados = false;
        this.flagResuelto = false;
        
    }
    
    

  }

  clickCerrados(){
    this.flagClickAbiertos=false;
    this.flagClickAsignados=false;
    this.flagClickCerrados=true;
    this.flagClickResueltos=false;
    if(this.incidentesCerrados().length >0){
      this.flagAbiertos = false;
      this.flagCerrados = true;
      this.flagAsignados = false;
      this.flagResuelto = false;
    }
    
    
  }

  clickResueltos(){
    
    this.flagClickAbiertos=false;
    this.flagClickAsignados=false;
    this.flagClickCerrados=false;
    this.flagClickResueltos=true;

    if(this.incidentesResueltos().length >0){
      this.flagAbiertos = false;
      this.flagCerrados = false;
      this.flagAsignados = false;
      this.flagResuelto = true;
    }
    console.log(this.flagClickResueltos);
    console.log(this.flagResuelto);
    console.log(this.incidentesResueltos());
    
  }


  clickAsignados(){
    this.flagClickAbiertos=false;
    this.flagClickAsignados=true;
    this.flagClickCerrados=false;
    this.flagClickResueltos=false;
    if(this.incidentesAsignados().length >0){
      
      this.flagAbiertos = false;
      this.flagCerrados = false;
      this.flagAsignados = true;
      this.flagResuelto = false;
    }
    
  }

}
