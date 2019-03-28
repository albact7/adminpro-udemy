import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from 'src/app/services/service.index';

declare var swal: any;
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  usuario:Usuario;

  imagenSubir: File;
  imagenTemp: string;

  oculto:string='';
  constructor(
    public _cargaArchivoService: SubirArchivoService
  ) { }

  ngOnInit() {
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

  subirImagen(){
    console.log('subida');
    
  }

}
