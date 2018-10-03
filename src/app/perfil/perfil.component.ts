import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from '../providers/localstorage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  filesToUpload: Array<File>;
  identity:any;
  token:any;
  url = 'http://localhost:3977/api/';
  urlGetImagen = 'http://localhost:3977/api/getImagen/';
  
  constructor(private ls:LocalstorageService) {
    this.identity = ls.getIdentity();
    this.token = ls.getToken();
    
   }

   ngOnInit(): void {
    
    $(document).ready(function() {
      $('.mdb-select').material_select();
  });
  }

  

  subirArchivo(fileInput:any){
    console.log(this.identity);
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if(this.filesToUpload){
      
      this.makeFileRequest(this.url+'subirImagen/'+this.identity._id, [], this.filesToUpload)
      .then(
        (result:any)=>{
          
          this.identity.imagen = result.imagen;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          console.log(this.identity);
        }
      );
    }
  }

  makeFileRequest(url:string, params: Array<string>, files:Array<File>){
    let token = this.token;
    return new Promise(function(resolve, reject){
      let formData:any = new FormData();
      let xhr = new XMLHttpRequest();
      for(let i = 0 ; i < files.length; i++){
        formData.append('image', files[i], files[i].name);
      }
      xhr.onreadystatechange = function(){
        if(xhr.readyState ==4){
          
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
          
          
        }
      }   
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    });
  }

}
