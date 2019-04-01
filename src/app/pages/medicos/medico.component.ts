import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medicos : Medico[];
  numero_medicos: number;
  hospitales: Hospital[];
  medico: Medico = new Medico('','', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicosService: MedicoService,
    public _hospitalService: HospitalService,
    public _modalUpdateService: ModalUploadService,
    public router:Router,
    public activatedRoute : ActivatedRoute
  ){
      activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if(id !== 'nuevo'){
          this.cargarMedico(id);
        }
      });   
   }

  ngOnInit() {
    this._modalUpdateService.notificacion
      .subscribe(resp=>{
        console.log(resp);
        this.medico.img = resp.medico.img;
      });
    this.cargarMedicos();
    this._hospitalService.getAll()
        .subscribe((resp:any) => this.hospitales = resp.hospitales);
  }

  cargarMedicos(){
    this._medicosService.getAll()
        .subscribe((resp:any) => {
            this.medicos = resp.medicos;
            this.numero_medicos = resp.total;
            console.log(this.medicos);
            
        });
  }

  guardarMedico(f : NgForm){
    console.log(f.value);

    if(f.invalid){
      return;
    }

    this._medicosService.create(this.medico)
      .subscribe( medico =>{
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      });
    
  }

  cambioHospital(id:string){
    
    this._hospitalService.getById(id)
      .subscribe((resp:any)=>{
        this.hospital = resp.hospital;
        
      });
    
  }

  cargarMedico(id:string){
    this._medicosService.getById(id)
      .subscribe(medico => {
        this.medico = medico
        this.cambioHospital(this.medico.hospital);
      });
  }

  cambiarFoto(){
    this._modalUpdateService.mostrarModal('medicos', this.medico._id);
  }

}
