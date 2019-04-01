import { Injectable } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { CRUDService } from '../interface.service';


declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService implements CRUDService{
 
  medico:Medico;
  token:string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    //this.cargarStorage();
    console.log('Medico service works');
    this.token = localStorage.getItem('token');
  }



  buscarMedicos(termino: string){
    let url = URL_SERVICIOS +'/busqueda/coleccion/medicos/'+ termino;
    return this.http.get(url);
  }
  
  obtenerMedico(id:string){
    let url = URL_SERVICIOS +'/medico/'+ id;
    return this.http.get(url);
  }

 


  getAll(){
    let url = URL_SERVICIOS+'/medico';
    return this.http.get(url);
  }
  update(med: Medico){
    
  }
  create(medico:Medico){
    let url= URL_SERVICIOS+'/medico';
    if(!medico._id){
      
      url += '?token='+this.token;  
      
      return this.http.post(url, medico)
              .pipe(map((resp:any) =>{
                swal('Medico creado', medico.nombre, 'success');
                return resp.medico;
              }));
    }else{
      url += '/'+medico._id;
      url += '?token='+this.token;
      console.log(url);
      return this.http.put(url, medico)
        .pipe(map((resp:any)=>{
          console.log('Actualizado medico', url);
          
          swal('Médico actualizado', medico.nombre, 'success');
          return resp.medico;
        }));
    }
   
    
   
  }
  delete(id:string){
      let url = URL_SERVICIOS+'/medico/'+id;
      url += '?token='+this.token;
      
      return this.http.delete(url)
        .pipe(map((resp:any) =>{
          console.log('borrado');
          
          swal('Medico borrado','Médico borrado correctamente', 'success');
          return;
      }));    
  }

  getById(id:string){
    let url = URL_SERVICIOS+'/medico/'+id;
    return this.http.get(url)
      .pipe(map((resp:any) => resp.medico));
  }
  
}
