import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from '../providers/localstorage.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RegistrationValidator} from '../providers/registrationValidator';
import {DatabaseService} from '../providers/database.service';
import { Usuario } from '../modelos/usuario';
import {NgbdModalContent} from '../inicio/inicio.component';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  dropdownList = [];
  dropdownSettings = {};
  selectedItems=[];
  form:FormGroup;
  constructor(private ls:LocalstorageService, private fb: FormBuilder, 
              private db: DatabaseService, private modal: NgbModal) {
    this.identity = ls.getIdentity();
    this.token = ls.getToken();

    this.form = fb.group({
      'nombre':[this.identity.nombre],
      'apellido':[this.identity.apellido],
      'mail':[this.identity.mail],
      'rol':[this.identity.rol],
      'interno':[this.identity.interno],
      'password':[this.identity.mail, Validators.required],
      'confirmpassword':[this.identity.mail, Validators.required],
      'tecnologia':[null]
    },
    {validator:RegistrationValidator.validate.bind(this)}
    );
    
    
   }

   ngOnInit(): void {
    
    this.dropdownList = [
      { item_id: 1, item_text: 'Front-End' },
      { item_id: 2, item_text: 'Back-End' },
      { item_id: 3, item_text: 'MuleSoft' },
      { item_id: 4, item_text: 'Cobol' },
      
    ];
    this.tecnologias();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Todos',
      unSelectAllText: 'Ninguno',
      itemsShowLimit: 4,
      allowSearchFilter: true,
      searchPlaceholderText:"Buscar"
    };
   
  }

  private open(mensaje){
    const modalRef = this.modal.open(NgbdModalContent);
    modalRef.componentInstance.name = mensaje;
}

  private tecnologias(){
    let aux = new Set();
    this.identity.tecnologia.forEach(element => {
      aux.add(element);
    });
    this.dropdownList.forEach((element:any) => {
      if(aux.has(element.item_text)){
        this.selectedItems.push(element);
      }
    });

  }

  //como se modifica el usuario es necesario volver a crear en el localstorage
  //el identity y el token. Hay que realizar un Login por atras.
  actualizarUsuario(form:any){
    let usuario = new Usuario();
    let aux = [];
    usuario.nombre=form.nombre;
    usuario.apellido=form.apellido;
    usuario.mail=form.mail;
    usuario.interno=form.interno;
    usuario.rol=form.rol;
    usuario.id=this.identity._id;
    this.selectedItems.forEach((element:any) => {
      aux.push(element.item_text);
    });
    
    usuario.tecnologia=aux;
    
    this.db.actualizarUsuario(usuario).subscribe(
      res=>{
        this.open("se ha actualizado el usuario correctamente")
      },
      error=>{
        this.open("ha ocurrido un error de servidor");
      }
    );
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
