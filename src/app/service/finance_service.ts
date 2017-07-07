import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { QueryRes } from '../components/app.component';

/**
 * Stock quote data factory.
 */
@Injectable ()
export class FinanceService {
    
    private base_url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20";
    
    private url_tail = "&env=store://datatables.org/alltableswithkeys&format=json";

    constructor (private http : Http) {}

    //Form query component from company tickers
    private form_query_specs (companies) : String {
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
    private make_query (companies) : string {
        return this.base_url + this.form_query_specs(companies) + this.url_tail;
    }

    /**
     * Get stock quotes from yahoo finance via REST API call
     * @param companies {Array<string>} list of stock tickers
     */
    get_quotes (companies) : Promise<QuoteResult[]> {
        return this.http.get(this.make_query(companies)).toPromise()
            .then(response => this.make_quote_result(response))
            .catch(err => alert("Problem occured while fetching financial data"));
    }

    //Converts http response to array of quote results
    private make_quote_result (res) : QuoteResult[] {
        let quotes = res.json().query.results.quote;
        return quotes.map(entry => this.process_quote(entry))
    }

    //Converts yql quote to QuoteResult object
    private process_quote (quote) : QuoteResult {
        return {
            symbol: quote.symbol,
            mavg_50: quote.FiftydayMovingAverage,
            mavg_100: 0, //Will be changed
            mavg_200: quote.TwoHundreddayMovingAverage,
            name: quote.Name,
            open_price: quote.Open, 
            close_price: quote.LastTradePriceOnly,
            daily_high: quote.DaysHigh,
            daily_low: quote.DaysLow, 
            daily_range: (quote.DaysHigh == null || quote.DaysLow == null) ? 
                -1 : Math.abs(quote.DaysHigh - quote.DaysLow), 
            last_updated: quote.LastTradeDate 
        }
    }
}

/**Data from a single company. Exported data from this 
 * service is in this format.
 */
export class QuoteResult {
    symbol: String;
    mavg_50: number;
    mavg_100: number;
    mavg_200: number;
    daily_range: number;
    name: string;
    open_price: number;
    close_price: number;
    daily_high: number;
    daily_low: number;
    last_updated: string;
}