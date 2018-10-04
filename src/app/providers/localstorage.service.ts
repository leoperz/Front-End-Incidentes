import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  indentity;
  token;
  constructor() { }


  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != "undefined"){
        this.indentity = identity;
    }else{
        this.indentity = null;
    }
    return this.indentity;
  }

  getToken(){
    let token = JSON.parse(localStorage.getItem('token'));
    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;

  }
}
