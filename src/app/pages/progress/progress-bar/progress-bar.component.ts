import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styles: []
})
export class ProgressBarComponent implements OnInit {
 

@Input("prog-bar") public value_bar: number=20;
@Input("color-class") public color_class: string = "";


  constructor() { 
    
  }

  ngOnInit() {
    
  }

 
  
  
  actualizar(valor){
    this.value_bar=valor;
  }

}
