import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../service.index';
import { map } from 'rxjs/operators';
import { CRUDService } from '../interface.service';


declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class HospitalService implements CRUDService{
 
  hospital:Hospital;
  token:string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    //this.cargarStorage();
    console.log('Hospital service works');
    this.token = localStorage.getItem('token');
  }

  cargarHospitales(){
    let url = URL_SERVICIOS+'/hospital';
    return this.http.get(url);
  }

  buscarHospitales(termino: string){
    let url = URL_SERVICIOS +'/busqueda/coleccion/hospitales/'+ termino;
    return this.http.get(url);
  }
  
  obtenerHospital(id:string){
    let url = URL_SERVICIOS +'/hospital/'+ id;
    return this.http.get(url);
  }

 

  actualizarHospital(hosp:Hospital){

    let url = URL_SERVICIOS+'/hospital/'+hosp._id;
    
    
    url += '?token='+this.token;
    console.log(url);
    return this.http.put(url, hosp)
      .pipe(map((resp:any)=>{
        console.log('Actualizado hps');
        
        swal('Hospital actualizado', hosp.nombre, 'success');
        return true;
      }));
  }

  getAll(): any[]{
    throw new Error("Method not implemented.");
  }
  update(hosp: Hospital){
    let url = URL_SERVICIOS+'/hospital/'+hosp._id;
    url += '?token='+this.token;
    console.log(url);
    return this.http.put(url, hosp)
      .pipe(map((resp:any)=>{
        console.log('Actualizado hps');
        
        swal('Hospital actualizado', hosp.nombre, 'success');
        return true;
      }));
  }
  create(properties: any[]){
    let hospital = new Hospital(
      properties[0]
    );

    let url= URL_SERVICIOS+'/hospital';
    url += '?token='+this.token;  
    
    return this.http.post(url, hospital)
            .pipe(map((resp:any) =>{
              swal('Hospital creado', hospital.nombre, 'success');
              return resp.hospital;
            }));
   
  }
  delete(id:string){
      let url = URL_SERVICIOS+'/hospital/'+id;
      url += '?token='+this.token;
      console.log(url);
      
      return this.http.delete(url)
        .pipe(map((resp:any) =>{
          console.log('borrado');
          
          swal('Hospital borrado','', 'success');
          return;
      }));
        
    
    
  }

}
