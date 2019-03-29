import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService, SubirArchivoService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  usuario:Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;
    

    this._usuarioService.update(this.usuario)
        .subscribe(resp => {
          console.log(resp);
          
        });
  }

  seleccionImagen(file){

    if(!file){
      this.imagenSubir = null;
      return ;
    }
   
    if(file.type.indexOf('image')<0){
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return ;
    }

    this.imagenSubir= file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(file);

    reader.onloadend= () =>{
      this.imagenTemp = reader.result as string;
    };
    
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
    
  }

}
