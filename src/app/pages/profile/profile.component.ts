import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  usuario:Usuario;
  constructor(
    public _usuarioService: UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;
    

    this._usuarioService.actualizarUsuario(this.usuario)
        .subscribe(resp => {
          console.log(resp);
          
        });
  }

}
