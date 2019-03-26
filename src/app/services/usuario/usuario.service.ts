import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) { 
    console.log('Serviciolisto');
    
  }

  crearUsuario(usuario: Usuario){
    let url= URL_SERVICIOS+'/usuario';

    return this.http.post(url, usuario);
  }
}
