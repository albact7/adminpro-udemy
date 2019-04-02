import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { CRUDService } from '../interface.service';
import { throwError } from 'rxjs/internal/observable/throwError';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements CRUDService{
  

usuario:Usuario;
token:string;
menu: any[] = [];

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
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }else{
    this.token = '';
    this.usuario=null;
    this.menu= [];
  }
}

guardarStorage(id: string, token: string, usuario:Usuario, menu:any){
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  localStorage.setItem('menu', JSON.stringify(menu));

  this.usuario= usuario;
  this.token= token;
  this.menu = menu;
}

logout(){
  this.usuario=null;
  this.token='';
  this.menu=[];

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  this.router.navigate(['/login']);
}

loginGoogle(token: string, recordar: boolean = false){
  let url = URL_SERVICIOS+ '/login/google';
  
  return this.http.post(url, {token})
          .pipe(map((resp:any)=>{
            this.guardarStorage(resp.id,resp.token, resp.usuario, resp.menu);
            console.log('login us service');
            
            console.log(resp.menu);
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
          .pipe(
            map((resp:any) => {
            this.guardarStorage(resp.id,resp.token, resp.usuario, resp.menu);
            console.log('login us service');
            
            console.log(resp.menu);
            
            return true;
          }),
          catchError( err=>{ 
            console.log(err.error.mensaje);
            swal('Error en el login', err.error.mensaje,'error');
            return throwError(err);
          })
          );

}


cambiarImagen(file: File, id:string){

  this._subirArchivoService.subirArchivo(file, 'usuarios', id)
    .then((resp: any) =>{
      this.usuario.img = resp.usuario.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
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
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);    
      }

      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }),
    catchError( err=>{ 
      console.log(err.error.mensaje);
      swal(err.error.mensaje, err.error.errors.message,'error');
      return throwError(err);
    })
    );
}
create(usuario: Usuario){
  let url= URL_SERVICIOS+'/usuario';

  return this.http.post(url, usuario)
          .pipe(map((resp:any) =>{
            swal('Usuario creado', usuario.email, 'success');
            return resp.usuario;
          }),
          catchError( err=>{ 
            console.log(err.error.mensaje);
            swal(err.error.mensaje, err.error.errors.message,'error');
            return throwError(err);
          })
          );
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

renuevaToken(){
  let url = URL_SERVICIOS + '/login/renuevatoken';
  url += '?token=' + this.token;

  return this.http.get(url)
    .pipe(
      map((resp : any)=>{
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('token renovado');
        
        return true;
      }),
      catchError( err=>{ 
        this.router.navigate(['/login']); 
        swal('No se pudo renovar token', 'No fue posible renovar token','error');
        return throwError(err);
      })
  );
}


}
