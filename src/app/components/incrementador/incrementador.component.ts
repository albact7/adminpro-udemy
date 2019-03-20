import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('titulo-botones') leyenda: string = 'Leyenda';
  @Input() progreso: number = 10;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
            
  }

  ngOnInit() {
    this.cambioValor.emit(this.progreso);
  }

  onChanges(newValue: number){
    
    //let elementHTML: any = document.getElementsByName('progreso')[0];
    //console.log(elementHTML.value);


    //console.log(this.txtProgress);
    
    
    
    if(newValue > 100) this.progreso = 100;
    else if(newValue < 0) this.progreso = 0;
    else this.progreso=newValue;

    //elementHTML.value = Number (this.progreso);
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
    
  }

  cambiarValor( valor ){
    if(this.progreso+valor > 100) return;
    if(this.progreso+valor < 0) return;
    this.progreso = this.progreso+valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }


}
