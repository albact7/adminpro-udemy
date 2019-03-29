import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

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

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
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
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then(resp=>{
          console.log('modalupload emite');
          this._modalUploadService.notificacion.emit(resp);
          this.cerrarModal();
         
        })
        .catch(err=>{
          console.log('Error en l a carga');
          
        });
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

}
