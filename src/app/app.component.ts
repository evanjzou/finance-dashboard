import { Component } from '@angular/core';
import { FinanceService } from './app.service.finance';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FinanceService]
})
export class AppComponent implements OnInit {
  
  private symbol : String;
  private ask : number;

  constructor (private financeService: FinanceService) { }

  ngOnInit() : void {
    this.financeService.getJson().then(obj => this.setVals(obj.symbol, obj.ask));
  }

  setVals(sym, ask) : void {
    this.symbol = sym;
    this.ask = ask;
  }

}

export class QueryRes {
  symbol: String;
  ask: number;

}
