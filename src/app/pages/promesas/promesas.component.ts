import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    

    this.contarTres().then(
      () => console.log('Terminó')    
    ).catch( error => console.log('Error en la promesa', error)
    )
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean>{
    let contador =0;
    let promesa = new Promise<boolean> ( (resolve, reject)=>{
    let intervalo =  setInterval( ()=>{
        contador +=1;
        console.log(contador);
        
        if(contador === 3){
          resolve(true);
          clearInterval(intervalo);
        }
      },1000);
    } );
    return promesa;
  }
}
