import { Component } from '@angular/core';
//import { FinanceService }  from './app.service.finance';
import { FinanceService, QuoteResult } from '../service/finance_service';
import { OnInit } from '@angular/core';
import { companies } from '../constants';
import { HistoricalDataService } from '../service/historical_data_factory';

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../styles/app.component.css'],
  providers: [FinanceService, HistoricalDataService]
})
export class AppComponent implements OnInit {
  
  private symbol : String;
  private ask : number;
  private company_info : QuoteResult[];
  private company_histories;

  constructor (private financeService: FinanceService, private historicalDataService: HistoricalDataService) { }

  /*ngOnInit() : void {
    this.financeService.getJson().then(obj => this.setVals(obj.symbol, obj.ask));
  }

  setVals(sym, ask) : void {
    this.symbol = sym;
    this.ask = ask;
  } */
  ngOnInit() : void {
    this.financeService.get_quotes(companies).then(response => this.set_company_info(response));
  }

  set_company_info (quote_res) : void {
    this.company_info = quote_res;
    //alert(this.company_info[0].symbol);
  }



}


//DEPRECATED**
export class QueryRes {
  symbol: String;
  ask: number;

}
