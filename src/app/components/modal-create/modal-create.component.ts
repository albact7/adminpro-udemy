import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CRUDService } from 'src/app/services/interface.service';
import { ModalCreateService } from './modal-create.service';

declare function init_plugins();
declare var swal: any;
@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styles: []
})
export class ModalCreateComponent implements OnInit {

  formGroup:FormGroup;
  service: CRUDService;
  imagenSubir: File;
  imagenTemp: string;
  constructor(
    public _modalCreateService: ModalCreateService
  ) { }

  ngOnInit() {
    init_plugins();
    this.formGroup = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      
    });
 
   
  }


  crearItem(){
    this.service = this._modalCreateService.currentService;  
    this.service.create(this.fromFormToArray())
    .subscribe(resp=> {
      this._modalCreateService.notificacion.emit();
      
    });
    this._modalCreateService.ocultarModal();
  }

  private fromFormToArray(): any[]{
    var properties: any[] = [
      this.formGroup.value.nombre
    ];

    return properties;
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

  cerrarModal(){

    this._modalCreateService.ocultarModal();
  }

}
