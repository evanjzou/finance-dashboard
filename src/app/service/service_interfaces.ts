import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export interface QuoteService {
    get_quotes(companies : string[] ) : Promise<Quote[]>;
}

export interface Quote {
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