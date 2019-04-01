import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalCreateService } from 'src/app/components/modal-create/modal-create.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { CRUDService } from 'src/app/services/interface.service';


declare var swal: any;
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {


  hospitales:Hospital[] = [];
  numero_hospitales: number=0;
  cargando: boolean = true

  constructor(
    public _hospitalService: HospitalService,
    public _modalCreateService: ModalCreateService,
    public _modalUpdateService: ModalUploadService
  ) { }

  ngOnInit() {
    
    
    this._modalCreateService.notificacion
      .subscribe();
    this._modalUpdateService.notificacion
      .subscribe();
    this.cargarHospitales();
  }

  mostrarModal(id:string){
    this._modalUpdateService.mostrarModal('hospitales', id);
  }

  crearHospital(){
    this._modalCreateService.mostrarModal('hospitales', this._hospitalService);
    console.log('hospC');
    
  }


  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.getAll()
        .subscribe((resp:any) =>{
          console.log(resp);
          
          this.hospitales = resp.hospitales;
          this.numero_hospitales = resp.total;
          this.cargando = false;
        });
    
  }

  actualizarHospital(hosp: Hospital, nombre:string){
    hosp.nombre = nombre;
    this._hospitalService.update(hosp)
        .subscribe(resp => {
          console.log(resp);
          console.log('hospital actualizado');
          
        });
  }

  borrarHospital(hospital:Hospital){
   
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this hospital!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._hospitalService.delete(hospital._id)
        .subscribe((resp:any)=>{
          swal("Poof! Your hospital has been deleted!", {
            icon: "success",
          });
          this.cargarHospitales();
        });
        
      } else {
        swal("Your hospital is safe!");
      }
      return;
    });
  }

  buscarHospital( termino: string ){
    if(termino.length<=0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospitales(termino)
        .subscribe((resp:any)=>{
          this.hospitales= resp.hospitales;
          this.cargando = false;

        });
  }

}
