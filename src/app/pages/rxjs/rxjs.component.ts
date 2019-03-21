import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  
  subscription : Subscription;

  constructor() { 
    this.subscription = this.regresaObservable().pipe(
      retry(2)
    )
    .subscribe(
      numero => console.log('subs', numero), // datos que se reciben
      error => console.log('Error  en el obs', error), //error
      ()=>console.log('El obs terminó')
      
      
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
    console.log('la página se va a cerrar');
    
  }


  regresaObservable():Observable<number>{
    return new Observable( (observer:Subscriber<any>)=>{
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);
        /*
        if(contador === 3){
          clearInterval(intervalo);
          observer.complete();
        }

        
        if(contador === 2){
          //clearInterval(intervalo);
          observer.error('oh, vaya');
        }
        */
      }, 1000);
    } ).pipe(
      map( resp => resp.valor) ,
      filter( (valor, index)=>{
        if(valor%2==1){
          return true;
        }else{
          return false;
        }
      
      })
    );
    
  }

}
