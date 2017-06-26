import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'basic-chart',
  templateUrl: '../templates/basic_chart.html',
  styleUrls: ['../styles/basic_chart.css']
})
export class BasicChart {

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;
  data = this.generateData();

  //Generate random placeholder data
  generateData() {
    let data = [];
    let base = 1950;
    for (let i = 0; i < 61; i++) {
      data[i] = {
        "name" : (base + i).toString(),
        "value" : Math.random() * 1000
      }
    }
    return [{
      "name": "test",
      "series" : data
    }]
  }
}