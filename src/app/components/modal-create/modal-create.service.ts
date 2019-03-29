import { Injectable, EventEmitter } from '@angular/core';
import { CRUDService } from 'src/app/services/interface.service';

@Injectable({
  providedIn: 'root'
})
export class ModalCreateService {
  public tipo:string;
  public id: string;
  public oculto:string= 'oculto';
  public currentService: CRUDService;

  public notificacion = new EventEmitter<any>();

  constructor() { 
    
  }

  ocultarModal(){
    this.oculto="oculto";
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo:string, service:CRUDService){
    this.oculto="";
    this.tipo = tipo;   
    this.currentService = service;
    console.log('modal create serv');
    console.log(this.currentService);
    
    
  }
}
