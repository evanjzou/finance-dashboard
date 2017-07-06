import { Component,  Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { companies } from '../constants';
import { CompanyData } from '../service/historical_data_factory';

@Component({
  selector: 'historical-data',
  templateUrl: '../templates/historical_data.html',
  styleUrls: ['../styles/historical_data.css'],
  providers: [] //To be changed
})
export class HistoricalDataComponent implements OnInit {
    
    @Input() private company_data : CompanyData[];
    private volatilityData : VolatilityData[] = [];
    private counter = 0;

    ngOnInit() : void {
      //TODO
      for (let company of this.company_data) {
        company.dailySeriesData.subscribe(
          this.generateVolatilityData.bind(this), //Bind fixed
          err => {throw 'FetchError'},
          () => {
            console.log("PULL SUCCESS");
            /* this.counter++;
            if (this.counter == companies.length) this.volatilityData.sort( (a, b) => {
              return b.range - a.range;
            }); */
            this.volatilityData.sort( (a, b) => {
              return b.range - a.range;
            });
          }
        );
      }
    }

    //Used to subscribe to time series Observable
    private generateVolatilityData(res) : void {
      let date = new Date();
      //get yesterday
      date = new Date(date.getTime() - 86400000); //86400000 = 24 hrs * 60 min/hr * 60 sec/min * 1000 ms/s
      let dayNum = date.getDate().toString();
      let year = date.getFullYear().toString();
      let month = date.getMonth().toString();
      dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
      month = parseInt(month) < 10  ? "0" + month : month;
      let dateString = year + "-" + month + "-" + dayNum;

      this.volatilityData.push({
        symbol: res["Meta Data"]["2. Symbol"],
        range: Math.abs(res["Time Series (Daily)"][dateString]["2. high"] - 
          res["Time Series (Daily)"][dateString]["3. low"])
      }); 
      /*this.volatilityData.push({
        symbol: "",
        range: 0,
      }); */
    }
}

interface VolatilityData {
  symbol: string;
  range: number; //Difference between high and low
}