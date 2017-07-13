import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { QuoteResult } from '../service/finance_service';
import { CompanyData } from '../service/historical_data_factory';
import { companies } from '../constants';

@Component({
    selector: 'data-table',
    templateUrl: '../templates/app.component.datatable.html',
    styleUrls: ['../styles/app.component.datatable.css']
})
export class DataTable implements OnInit {
    //@Input() companies: QuoteResult[];
    @Input() companyData: CompanyData[];

    dispData = {};
    private yesterday : string; 
    private keys = [];
    
    ngOnInit() {
        let date = new Date();
        date = new Date(date.getTime() - 86400000);
        let dayNum = date.getDate().toString();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
        month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
        this.yesterday = year + "-" + month + "-" + dayNum;
        for (let i = 0; i < companies.length; i++) {
            this.dispData[companies[i]] = {
                symbol : companies[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0
            }
            this.keys.push(companies[i]);
            this.companyData[i].mavg50Data.subscribe(
                this.set50DayMA.bind(this),
                this.historyServiceErrorHandle,
                this.completionHandler
            );
            this.companyData[i].mavg100Data.subscribe(
                this.set100DayMA.bind(this),
                this.historyServiceErrorHandle,
                this.completionHandler
            );
            this.companyData[i].mavg200Data.subscribe(
                this.set200DayMA.bind(this),
                this.historyServiceErrorHandle,
                this.completionHandler
            );
        }
    }

    private historyServiceErrorHandle(err) : void {
        throw 'Error Retrieving Historical Data';
    }

    private completionHandler() : void {
        console.log("Completed");
    }

    private set50DayMA(res) : void {
        if (res["Technical Analysis: SMA"][this.yesterday] == undefined) return;
        this.dispData[res["Meta Data"]["1: Symbol"]].mavg_50 = 
            res["Technical Analysis: SMA"][this.yesterday]["SMA"];
    }

    private set100DayMA(res) : void {
        if (res["Technical Analysis: SMA"][this.yesterday] == undefined) return;
        this.dispData[res["Meta Data"]["1: Symbol"]].mavg_100 = 
            res["Technical Analysis: SMA"][this.yesterday]["SMA"];
    }

    private set200DayMA(res) : void {
        if (res["Technical Analysis: SMA"][this.yesterday] == undefined) return;
        this.dispData[res["Meta Data"]["1: Symbol"]].mavg_200 = 
            res["Technical Analysis: SMA"][this.yesterday]["SMA"];
    }
}

interface StockTableData {
    symbol : string;
    mavg_50 : number;
    mavg_100 : number;
    mavg_200 : number;
}