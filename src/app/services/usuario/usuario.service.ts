import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
    
  }

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

  crearUsuario(usuario: Usuario){
    let url= URL_SERVICIOS+'/usuario';

    return this.http.post(url, usuario)
            .pipe(map((resp:any) =>{
              swal('Usuario creado', usuario.email, 'success');
              return resp.usuario;
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

  actualizarUsuario(usuario:Usuario){

    let url = URL_SERVICIOS+'/usuario/'+usuario._id;
    url += '?token='+this.token;

    return this.http.put(url, usuario)
      .pipe(map((resp:any)=>{
        this.usuario = resp.usuario;
        let usuarioDB: Usuario= resp.usuario 
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }));
  }
}
