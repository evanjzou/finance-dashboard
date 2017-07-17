import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import { companies } from '../constants';

@Injectable()
export class HistoricalDataService {
    //API key = U8DGBF2PDMXR2FZT

    //SMA data
    readonly smaUrl = "https://www.alphavantage.co/query?function=SMA&symbol="
    readonly smaUrlMid = "&interval=daily&time_period=";
    readonly smaUrlTail = "&series_type=close&apikey=U8DGBF2PDMXR2FZT";

    //daily price
    readonly dailySeriesUrlHead = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
    readonly dailySeriesUrlTail = "&outputsize=full&apikey=U8DGBF2PDMXR2FZT";

    constructor(private http : Http) { }

    private getSMA (company: string, period : number) : Observable<any> {
        return this.http.get(this.smaUrl + company + this.smaUrlMid + period.toString() + this.smaUrlTail)
            .map(res => res.json())
            .publishLast()
            .refCount();
    }

    private getDailySeries(company: string) : Observable<any> {
        return this.http.get(this.dailySeriesUrlHead + company + this.dailySeriesUrlTail)
            .map(res => res.json())
            .publishLast()
            .refCount();
    }

    private getCompanyData(company) : CompanyData {
        return {
            symbol: company,
            dailySeriesData: this.getDailySeries(company),
            mavg50Data: this.getSMA(company, 50),
            mavg100Data: this.getSMA(company, 100),
            mavg200Data: this.getSMA(company, 200)
        }
    }

    /**
     * Returns an array of CompanyData representing companies 
     * defined in constants
     */
    public getStockData() : CompanyData[] {
        let data = [];
        for (let company of companies) {
            data.push(this.getCompanyData(company));
        }
        return data;
    }

}

/**
 * Represents a collection of data representing the 50 day SMA, 
 * 100 day SMA, 200 day SMA, and daily series of a single company
 */
export interface CompanyData {
    symbol: string;
    dailySeriesData: Observable<any>;
    mavg50Data: Observable<any>;
    mavg100Data: Observable<any>;
    mavg200Data: Observable<any>;
}