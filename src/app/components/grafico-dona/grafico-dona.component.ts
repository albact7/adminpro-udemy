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
  @Input() public dataSet: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input() public type: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
    console.log(this.labels, this.dataSet, this.type);
    
  }

  introduceData(labels: Label[], dataset:MultiDataSet){
    this.labels = labels;
    this.dataSet = dataset;
  }

}
