import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CRUDService } from 'src/app/services/interface.service';
import { ModalCreateService } from './modal-create.service';

declare function init_plugins();
@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styles: []
})
export class ModalCreateComponent implements OnInit {

  formGroup:FormGroup;
  service: CRUDService;
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

  cerrarModal(){

    this._modalCreateService.ocultarModal();
  }

}
