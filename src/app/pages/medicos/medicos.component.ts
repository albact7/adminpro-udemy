import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos : Medico[];
  numero_medicos: number;

  constructor(
    public _medicosService: MedicoService
  ) {   }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicosService.getAll()
        .subscribe((resp:any) => {
            this.medicos = resp.medicos;
            this.numero_medicos = resp.total;
            
        });
  }

  buscarMedico(termino:string){

    if(termino.length<=0){
      this.cargarMedicos();
      return;
    }

    this._medicosService.buscarMedicos(termino)
    .subscribe((resp:any) => {
        this.medicos = resp.medicos;        
    });
  }

  borrarMedico(medico:Medico){
    this._medicosService.delete(medico._id)
        .subscribe(()=> this.cargarMedicos());
  }

}
