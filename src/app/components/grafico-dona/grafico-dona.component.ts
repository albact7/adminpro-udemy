import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input() public labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public data: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input() public chartType: ChartType = 'doughnut';
  @Input() public leyenda:string = 'Leyenda';

  constructor() { console.log(this.labels, this.data, this.chartType);}

  ngOnInit() {
    console.log(this.labels, this.data, this.chartType);
    
  }

  

}
