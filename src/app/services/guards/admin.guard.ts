import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;


  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}

  canActivate():Observable<boolean> | Promise<boolean> | boolean{

    if(this._usuarioService.usuario.role == 'ADMIN_ROLE'){
      return true;
    }else{
      console.log('Bloqueado por el adminguard');
      this._usuarioService.logout();
      return false;
      
    }
  }
  
}
