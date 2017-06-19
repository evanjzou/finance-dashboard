import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { QueryRes } from '../components/app.component';

@Injectable ()
export class FinanceService {
    
    private base_url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20";
    
    private url_tail = "&env=store://datatables.org/alltableswithkeys&format=json";

    constructor (private http : Http) {}
    /*
    //DEPRECATED**Make YQL API call from query string
    getJson () : Promise<QueryRes> {
        return this.http.get(this.url).toPromise()
        .then(response => 
            this.process(response))
        .catch(error => console.log("Problem"));
    }

    //DEPRECATED**Convert results into useable format
    process(res) : QueryRes {
        let results = res.json().query.results.quote;
        return {
            symbol: results.symbol,
            ask: results.Ask
        }
    } */

    //Form query component from company tickers
    form_query_specs (companies) : String {
        let base = "(";
        for (let _i = 0; _i < companies.length; _i++) {
            if (_i == companies.length - 1) {
                base = base + "%22" + companies[_i] + "%22)";
            }
            else {
                base = base + "%22" + companies[_i] + "%22,";
            }
        }
        return base;
    }

    //Make full query url
    make_query (companies) : string {
        return this.base_url + this.form_query_specs(companies) + this.url_tail;
    }

    //Get quote via api call
    get_quotes (companies) : Promise<QuoteResult[]> {

        //alert(this.make_query(companies));
        return this.http.get(this.make_query(companies)).toPromise()
            .then(response => this.make_quote_result(response))
            .catch(err => alert("Problem occured while fetching financial data"));
    }

    //Converts http response to array of quote results
    make_quote_result (res) : QuoteResult[] {
        let quotes = res.json().query.results.quote;
        return quotes.map(entry => this.process_quote(entry))
    }

    //Converts yql quote to QuoteResult object
    process_quote (quote) : QuoteResult {
        return {
            symbol: quote.symbol,
            mavg_50: quote.FiftydayMovingAverage,
            mavg_100: 0, //Will be changed
            mavg_200: quote.TwoHundreddayMovingAverage,
            daily_range: 0, //Will be changed
            name: quote.Name
        }
    }
}

/*Data from a single company. Exported data from this 
 *service is in this format.
 */
export class QuoteResult {
    symbol: String;
    mavg_50: number;
    mavg_100: number;
    mavg_200: number;
    daily_range: number;
    name: string;
}