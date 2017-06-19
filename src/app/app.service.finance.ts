/*DEPRECATED-- refer to service/finance_service
 *
*/

import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { QueryRes } from './app.component';

@Injectable ()
export class FinanceService {

    private url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL%22)&env=store://datatables.org/alltableswithkeys&format=json";
    
    private base_url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20";
    
    private url_tail = "&env=store://datatables.org/alltableswithkeys&format=json";

    constructor (private http : Http) {}

    //Make YQL API call from query string
    getJson () : Promise<QueryRes> {
        return this.http.get(this.url).toPromise()
        .then(response => 
            this.process(response))
        .catch(error => console.log("Problem"));
    }

    //Convert results into useable format
    process(res) : QueryRes {
        let results = res.json().query.results.quote;
        return {
            symbol: results.symbol,
            ask: results.Ask
        }
    }
}