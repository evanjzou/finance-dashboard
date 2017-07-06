import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { companies } from '../constants';

@Injectable()
export class HistoricalDataService {
    private url = "https://www.alphavantage.co/query?function=SMA&symbol=MSFT&interval=daily&time_period=5&series_type=close&apikey=U8DGBF2PDMXR2FZT";

    //API key = U8DGBF2PDMXR2FZT

    //SMA data
    readonly smaUrl = "https://www.alphavantage.co/query?function=SMA&symbol="
    readonly smaUrlMid = "&interval=daily&time_period=";
    readonly smaUrlTail = "&series_type=close&apikey=U8DGBF2PDMXR2FZT";

    //daily price
    readonly dailySeriesUrlHead = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
    readonly dailySeriesUrlTail = "&apikey=U8DGBF2PDMXR2FZT";

    constructor(private http : Http) { }

    //Deprecated
    /*get_history() {
        this.http.get(this.url).toPromise()
            .then(response => formatData(response))
            .catch(err => alert("An error occured while fetching history"));
    } 

    getSMAHistory(company, period) {
        this.http.get(this.smaUrl + company + this.smaUrlMid + period.toString() + this.smaUrlTail).toPromise()
            .then(response => this.formatSMAData(response))
            .catch(err => alert("An error occured while fetching historical sma data"));
    }
    
    formatSMAData(response) {
        let data = response.json()["Technical Analysis: SMA"];
    } */

    getSMA (company: string, period : number) : Observable<any> {
        return this.http.get(this.smaUrl + company + this.smaUrlMid + period.toString() + this.smaUrlTail)
            .map(res => res.json());
    }

    getDailySeries(company: string) : Observable<any> {
        return this.http.get(this.dailySeriesUrlHead + company + this.dailySeriesUrlTail)
            .map(res => res.json());
    }

    getCompanyData(company) : CompanyData {
        return {
            symbol: company,
            dailySeriesData: this.getDailySeries(company),
            mavg50Data: this.getSMA(company, 50),
            mavg100Data: this.getSMA(company, 100),
            mavg200Data: this.getSMA(company, 200)
        }
    }

    getStockData() : CompanyData[] {
        let data = [];
        for (let company of companies) {
            data.push(this.getCompanyData(company));
        }
        return data;
    }

}

export interface CompanyData {
    symbol: string;
    dailySeriesData: Observable<any>;
    mavg50Data: Observable<any>;
    mavg100Data: Observable<any>;
    mavg200Data: Observable<any>;
}