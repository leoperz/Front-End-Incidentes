import { Component, OnInit, Input} from '@angular/core';
import { Usuario } from '../modelos/usuario';
import {DatabaseService} from '../providers/database.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalstorageService} from '../providers/localstorage.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Mensaje!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{name}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
 dropdownList = [];
 dropdownSettings = {};
 closeResult:string;
 form: FormGroup;
 form2:FormGroup;
 titulo: string ="BSIncidentes";
 usuarioLogueado: any;
 identity:any;
 token:string ="pepe";


  constructor(private _db : DatabaseService, private fb: FormBuilder,
                private _ls : LocalstorageService, public modal: NgbModal) { 

      this.form = fb.group({
      'mail':[null, Validators.compose([Validators.required, Validators.email])],
      'password':[null, Validators.compose([Validators.required, Validators.minLength(5)])]
       });
        this.form2 = fb.group({
      'nombre':[null,Validators.required],
      'apellido':[null, Validators.required],
      'mail':[null, Validators.compose([Validators.email, Validators.required])],
      'password':[null, Validators.compose([Validators.required])],
      'rol': [null, Validators.compose([Validators.required])],
      'tecnologia': [null, Validators.compose([Validators.required])]

    });}

    ngOnInit(): void {
      this.dropdownList = [
        { item_id: 1, item_text: 'Front-End' },
        { item_id: 2, item_text: 'Back-End' },
        { item_id: 3, item_text: 'MuleSoft' },
        { item_id: 4, item_text: 'Cobol' },
        
      ];
    this.identity= this._ls.getIdentity();
    this.token= this._ls.getToken();
    if(this.identity){
      this.usuarioLogueado = this.identity.nombre;
      
    }
  }


  //funciones del multi-select

  onItemSelect (item:any) {
    console.log(item);
  }

  onSelectAll (items: any) {
    console.log(items);
  }



  // funciones del modal

  
private open(mensaje){
    const modalRef = this.modal.open(NgbdModalContent);
    modalRef.componentInstance.name = mensaje;
}
  

  //fin de funciones modal


  public logoutUsuario(){
    localStorage.removeItem('token');
    localStorage.removeItem('token');
    this.identity=null;
    this.token=null;
  }



 public loginUsuario(form:any):void{
   
  let usuario = new Usuario();
  usuario.setMail(form.mail);
  usuario.setPassword(form.password);
   
  
   this._db.loginUsuario(usuario).subscribe(
     res  =>{
      
      this.identity = res.us;

      //crear el elemento en el local storage
        
        localStorage.setItem('identity',JSON.stringify(this.identity) )

      //conseguir el token para enviarselo al MD de cada peticion
             this._db.loginUsuario(usuario, 'true').subscribe(
              res  =>{
                
             this.open('se ha logueado correctamente');   
                
               
              this.token = res.token;
             
              if(this.token.length <= 0){
                alert("el token no se ha generado correctamente");
              }else{

              }
   
         //crear el elemento en el local storage
           localStorage.setItem('token',this.token); 
           console.log("creo el token en el local storage", this.token);  
          
   
                },
                  error =>{
                  let body = JSON.parse(error._body);
                  console.log("este es el error:", body)
        
                }
                  );



     },
     error =>{
     let body = JSON.parse(error._body);
     this.open(body.message);
     
     }
   )

   
  }



  guardarUsuario(form:any):void{
    let usuario = new Usuario();
    usuario.setNombre(form.nombre);
    usuario.setApellido(form.apellido);
    usuario.setMail(form.mail);
    usuario.setPassword(form.password);
    usuario.setRol(form.rol);
    usuario.setTecnologia(form.tecnologia);
    this._db.guardarUsuario(usuario).subscribe(

      res=>{
        console.log('se ha registrado al usuario' ,res.mail)
        this.form2.reset();
      },
      error=>{
        alert('Error al registrarse');
      }


    );
  }

  

}

