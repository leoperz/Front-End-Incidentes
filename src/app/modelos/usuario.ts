        

export class Usuario{
    
    private id: string;
    private nombre: string;
    private apellido: string;
    private mail: string;
    private rol: string;
    private tecnologia: Array<string>;
    private imagen: string;
    private password: string;
    private interno:string;
    
    constructor(){

    }
    setNombre(nombre:string):void{
        this.nombre = nombre;
    }


    setApellido(apellido:string):void{
        this.apellido=apellido;
    }



    setMail(mail:string):void{
        this.mail=mail;
    }


    setRol(rol:string):void{        
        this.rol=rol;
    }


    setTecnologia(tecnologia:Array<string>){
        this.tecnologia=tecnologia;
    }


    setImagen(imagen:string):void{
        this.imagen = imagen;
    }


    setPassword(password:string):void{
        this.password=password;
    }


    setId(id:string):void{
        this.id=id;
    }

    setInterno(interno:string):void{
        this.interno=interno;
    }



    }