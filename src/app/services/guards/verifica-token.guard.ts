import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements  CanActivate{
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}


  canActivate(): Promise<boolean> |boolean {
    console.log('inicio de verifica token guard');
    
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob(token.split('.')[1]) );

    let expirado = this.expirado(payload.exp);

    if(expirado){
      this.router.navigate(['/login']);
      return false;
    }

  
    return true;
  }

  verificaRenueva(fechaExp: number): Promise <boolean>{

    return new Promise((resolve, reject)=>{
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();
      
      ahora.setTime(ahora.getTime()+(4*60*60*1000));

      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      }else{
        this._usuarioService.renuevaToken()
          .subscribe( () =>{
            resolve(true);
          }, ()=>{
            reject(false);
            this.router.navigate(['/login']);

          });
      }

      });
  }

  expirado(fechaExp: number){
    let ahora = new Date().getTime()/1000;
    if(fechaExp <ahora){
      return true;
    }else{
      return false;
    }
  }

  
}
