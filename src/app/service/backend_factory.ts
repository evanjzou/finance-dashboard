import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';

@Injectable()
export class StockDataFactory {
    readonly url = '/api/stockdata';

    constructor(private http : Http) { }

    public getStockData() {
        return this.http.get(this.url)
            .map(res => res.json())
            .publishLast()
            .refCount();
    }
}