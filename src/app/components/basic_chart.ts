import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CompanyData } from '../service/historical_data_factory';

@Component({
  selector: 'basic-chart',
  templateUrl: '../templates/basic_chart.html',
  styleUrls: ['../styles/basic_chart.css']
})
export class BasicChart implements OnInit {

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Range';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;
  data; //  =this.generateData();
  //data =  this.generateData();

  seriesByCompany : Series<number>[][] = [];


  //Company data from input
  @Input() companyData : CompanyData[];
  @Input() stockData;

  ngOnInit() {
    //To be completed
    /*this.companyData[0].dailySeriesData.subscribe(
      this.setData.bind(this),
      err => {throw 'Chart Error'},
      () => {console.log("Complete")}
    ); //*/

    for (let i = 0; i < this.companyData.length; i++) {
      this.companyData[i].dailySeriesData.subscribe(
        this.setCompanySeries.bind(this),
        err => {throw 'Chart Error'},
        () => {console.log("Complete")}
      );
    } 
    this.stockData.subscribe(
      //TODO
    );
  }

  seriesFromRes(res) : Series<number>[][] {
    return [];
  }

  

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

  private createPoint (name : string, value : number) : DataPoint<number> {
    return {
      "name" : name,
      "value" : value
    }
  }

  private createSeries (name : string, data: DataPoint<number>[]) : Series<number> {
    return {
      "name" : name,
      "series" : data
    }
  }

  /**
   * Returns 2 series: series and a series forming a single average line
   */
  private addSeriesAvg (series : Series<number>) : Series<number>[] {
    //Prereq: series is sorted by date
    let avg = series["series"].reduce((total, point) => { 
      return total + point["value"];
    }, 0) / series["series"].length;

    let avgSeries = [];
    for (let i = 0; i < series["series"].length; i++) {
      avgSeries[i] = {
        "name" : series["series"][i]["name"],
        "value" : avg
      };
    }
    return  [{
      "name" : "Average",
      "series" : avgSeries
    },
    series]
  }

  private rangeSeriesFromResponse(res) : Series<number> {
    /* return {
      "name" : res["Meta Data"]["2. Symbol"] + " by day (30)",
      "series" : this.rangeDataFromResponse(res)
    } */
    return this.createSeries(res["Meta Data"]["2. Symbol"] + " by day (30)", 
      this.rangeDataFromResponse(res));
  }

  private rangeDataFromResponse(res) : DataPoint<number>[] {
    let timeSeries = res["Time Series (Daily)"];
    let num = 30 //30 Days
    let date = new Date();

    let points = [];

    for (let i = 0; i < num; i++) {
        let curr = new Date(date.getTime() - (i * 86400000));
        let dayNum = curr.getDate().toString();
        let year = curr.getFullYear().toString();
        let month = curr.getMonth().toString();
        dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
        month = parseInt(month) < 10  ? "0" + month : month;
        let dateString = year + "-" + month + "-" + dayNum;
        if (res["Time Series (Daily)"].hasOwnProperty(dateString)) {
          /*points.push({
            "name" : dateString,
            "value" : Math.abs(timeSeries[dateString]["2. high"] - timeSeries[dateString]["3. low"])
          }) */
          points.push(this.createPoint(dateString, 
            Math.abs(timeSeries[dateString]["2. high"] - timeSeries[dateString]["3. low"])));
        }
        else num++; //Ignore weekends or days with no data
    }
    return points.reverse(); //Points are pushed in reverse order
  }

  private setData(res) : void {
    this.data = this.addSeriesAvg(this.rangeSeriesFromResponse(res));
  }

  private setCompanySeries(res) {
    this.seriesByCompany.push(this.addSeriesAvg(this.rangeSeriesFromResponse(res)));
  }
  
}

class DataPoint<T> {
  "name" : string;
  "value" : T;
}

class Series<T> {
  "name" : string;
  "series" : DataPoint<T>[];
}