import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable()
export class LoginGuardGuard implements  CanActivate{

  constructor(public _usuarioService: UsuarioService,
    public router: Router
    ){}

  canActivate(): boolean {
    if(this._usuarioService.estaLogueado()){
      return true;
    }else{
      console.log('bloqueado por login guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

  
  
}
