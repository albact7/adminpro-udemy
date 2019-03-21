import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, 
              private _ajustes: SettingsService) {
            
  }

  ngOnInit() {
    this.colocarCheck();     
  }

  cambiarColor(color:string, link: any){
    this.aplicarCheck(link);    
    this._ajustes.aplicarTema(color);
  }

  aplicarCheck( link: any ){
    
    let selectores:any = document.getElementsByClassName('selector');

    for(let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
    
  }

  colocarCheck(  ){
   
    let selectores:any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;
    for(let ref of selectores){
      ref.classList.remove('working');
        if(ref.getAttribute('data-theme') === tema){
          ref.classList.add('working');
          break;
        }
    }
    
    
  }

}
