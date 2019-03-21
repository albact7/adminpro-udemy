import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  

  @Input() public progreso: number = 90; 

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

 


 

}
