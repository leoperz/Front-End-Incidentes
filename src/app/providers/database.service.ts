import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import{LocalstorageService} from '../providers/localstorage.service';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public url:string;
  public ip: '127.0.0.1';
  constructor(private _http : Http, private ls: LocalstorageService) {
    this.url = 'http://localhost:3977/api/';
   }

   loginUsuario(usuario, gethash=null){
     if(gethash!=null){
       usuario.gethash = gethash;
     }
     let json = JSON.stringify(usuario);
     
     let headers = new Headers({'Content-Type':'application/json'});
     return this._http.post(this.url+'login', json, {headers:headers}).
     pipe(map(res=>res.json()));
   }

   guardarUsuario(usuario){
     
    let json = JSON.stringify(usuario);
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.post(this.url+'guardarUsuario', json, {headers:headers}).
    pipe(map(res=>res.json()));

   }


   actualizarUsuario(usuario){
     
    let json = JSON.stringify(usuario);
    let headers = new Headers({'Content-Type':'application/json','Authorization':this.ls.getToken()});
    return this._http.put(this.url+'actualizar/'+usuario.id, json, {headers:headers}).
    pipe(map(res=>res.json()));
   }


   guardarIncidente(incidente){
    let json = JSON.stringify(incidente);
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.post(this.url+'guardarIncidente', json, {headers:headers}).
    pipe(map(res =>res.json()));
   }


   listarIncidentes(){
    
    let headers = new Headers({'Content-Type':'application/json'});
    return this._http.get(this.url+'listarIncidentes', {headers:headers}).
    pipe(map(res=>res.json()));
   }
}

