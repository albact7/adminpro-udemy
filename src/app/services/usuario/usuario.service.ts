import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { CRUDService } from '../interface.service';


declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements CRUDService{
  

usuario:Usuario;
token:string;

constructor(
  public http: HttpClient,
  public router: Router,
  public _subirArchivoService: SubirArchivoService
) { 
  this.cargarStorage();
  
}

getById(id:string){}

estaLogueado(){
  return (this.token.length > 5)? true: false;
}

cargarStorage(){
  if(localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }else{
    this.token = '';
    this.usuario=null;
  }
}

guardarStorage(id: string, token: string, usuario:Usuario){
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));

  this.usuario= usuario;
  this.token= token;
}

logout(){
  this.usuario=null;
  this.token='';

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  this.router.navigate(['/login']);
}

loginGoogle(token: string, recordar: boolean = false){
  let url = URL_SERVICIOS+ '/login/google';
  
  return this.http.post(url, {token})
          .pipe(map((resp:any)=>{
            this.guardarStorage(resp.id,resp.token, resp.usuario);
            return true;
          }));
} 


login(usuario:Usuario, recordar: boolean = false){

  if(recordar) {
    localStorage.setItem('email', usuario.email);
  }else {
    localStorage.removeItem('email');
  }

  let url = URL_SERVICIOS + '/login';
  return this.http.post(url, usuario)
          .pipe(map((resp:any) => {
            this.guardarStorage(resp.id,resp.token, resp.usuario);
            return true;
          }));

}


cambiarImagen(file: File, id:string){

  this._subirArchivoService.subirArchivo(file, 'usuarios', id)
    .then((resp: any) =>{
      this.usuario.img = resp.usuario.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario);
    })
    .catch(resp =>{
      console.log(resp);
      
    });
}



buscarUsuarios(termino: string){
  let url = URL_SERVICIOS +'/busqueda/coleccion/usuarios/'+ termino;
  return this.http.get(url);
}

getAll(desde: number = 0){
  let url = URL_SERVICIOS+'/usuario?desde='+desde;
  return this.http.get(url);
}
update(usuario: Usuario){
  let url = URL_SERVICIOS+'/usuario/'+usuario._id;
  url += '?token='+this.token;

  return this.http.put(url, usuario)
    .pipe(map((resp:any)=>{
      this.usuario = resp.usuario;
      if(usuario._id === this.usuario._id){
        let usuarioDB: Usuario= resp.usuario 
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);    
      }

      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }));
}
create(usuario: Usuario){
  let url= URL_SERVICIOS+'/usuario';

  return this.http.post(url, usuario)
          .pipe(map((resp:any) =>{
            swal('Usuario creado', usuario.email, 'success');
            return resp.usuario;
          }));
}
delete(id: string){
  let url = URL_SERVICIOS+'/usuario/'+id;
  url += '?token='+this.token;
  console.log(url);
  
  return this.http.delete(url)
    .pipe(map((resp:any) =>{
      console.log('borrado');
      
      swal('Usuario borrado','', 'success');
      return;
  }));
}


}
