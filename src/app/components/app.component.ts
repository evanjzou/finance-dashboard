import { Component } from '@angular/core';
//import { FinanceService }  from './app.service.finance';
import { FinanceService, QuoteResult } from '../service/finance_service';
import { OnInit } from '@angular/core';
import { companies } from '../constants';
import { HistoricalDataService, CompanyData } from '../service/historical_data_factory';
import { StockDataFactory } from '../service/backend_factory';

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../styles/app.component.css'],
  providers: [FinanceService, HistoricalDataService, StockDataFactory]
})
export class AppComponent implements OnInit {
  
  symbol : String;
  ask : number;
  company_info : QuoteResult[];
  company_histories : CompanyData[];
  index_data : CompanyData[];
  stockData;

  constructor (private financeService: FinanceService, 
    private historicalDataService: HistoricalDataService,
      private stockDataService: StockDataFactory) { }

  /*ngOnInit() : void {
    this.financeService.getJson().then(obj => this.setVals(obj.symbol, obj.ask));
  }

  setVals(sym, ask) : void {
    this.symbol = sym;
    this.ask = ask;
  } */
  ngOnInit() : void {
    //this.financeService.get_quotes(companies).then(response => this.set_company_info(response));
    this.company_histories = this.historicalDataService.getStockData();
    this.index_data = this.historicalDataService.getIndexData();
    this.stockData = this.stockDataService.getStockData();
  }
}


//DEPRECATED**
export class QueryRes {
  symbol: String;
  ask: number;

}
