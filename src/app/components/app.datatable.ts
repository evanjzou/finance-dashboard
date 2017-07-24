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
        /*let date = new Date();
        date = new Date(date.getTime() - 86400000);
        while (date.getDay() == 0 || date.getDay() == 6) {
            date = new Date(date.getTime() - 86400000);
        }
        let dayNum = date.getDate().toString();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
        month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
        this.yesterday = year + "-" + month + "-" + dayNum; */
        for (let i = 0; i < companies.length; i++) {
            this.dispData[companies[i]] = {
                symbol : companies[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0
            }
            /*
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
            ); */
            this.keys.push(companies[i]);
            this.companyData[i].dailySeriesData.subscribe(
                this.calculateSMAData.bind(this),
                this.historyServiceErrorHandle,
                this.completionHandler
            )
        } 
    }

    private historyServiceErrorHandle(err) : void {
        throw 'Error Retrieving Historical Data';
    }

    private completionHandler() : void {
        console.log("Completed");
    }

    /** @deprecated */
    private set50DayMA(res) : void {
        while (!res["Technical Analysis: SMA"].hasOwnProperty(this.yesterday)) {
            let date = (new Date(new Date(this.yesterday).getTime() - 86400000));
            let dayNum = date.getDate().toString();
            let year = date.getFullYear().toString();
            let month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            this.yesterday = year + "-" + month + "-" + dayNum;
        } //Add to others
        if (res["Technical Analysis: SMA"][this.yesterday] == undefined) return;
        this.dispData[res["Meta Data"]["1: Symbol"]].mavg_50 = 
            res["Technical Analysis: SMA"][this.yesterday]["SMA"];
    }

    /** @deprecated */
    private set100DayMA(res) : void {
        while (!res["Technical Analysis: SMA"].hasOwnProperty(this.yesterday)) {
            let date = (new Date(new Date(this.yesterday).getTime() - 86400000));
            let dayNum = date.getDate().toString();
            let year = date.getFullYear().toString();
            let month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            this.yesterday = year + "-" + month + "-" + dayNum;
        }
        if (res["Technical Analysis: SMA"][this.yesterday] == undefined) return;
        this.dispData[res["Meta Data"]["1: Symbol"]].mavg_100 = 
            res["Technical Analysis: SMA"][this.yesterday]["SMA"];
    }

    /** @deprecated */
    private set200DayMA(res) : void {
        while (!res["Technical Analysis: SMA"].hasOwnProperty(this.yesterday)) {
            let date = (new Date(new Date(this.yesterday).getTime() - 86400000));
            let dayNum = date.getDate().toString();
            let year = date.getFullYear().toString();
            let month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            this.yesterday = year + "-" + month + "-" + dayNum;
        }
        if (res["Technical Analysis: SMA"][this.yesterday] == undefined) return;
        this.dispData[res["Meta Data"]["1: Symbol"]].mavg_200 = 
            res["Technical Analysis: SMA"][this.yesterday]["SMA"];
    }

    //Subscribe with this method
    private calculateSMAData(res) : void {
        this.dispData[res["Meta Data"]["2. Symbol"]] = this.calculateSMA(res);
    }

    //SMA for [days]
    private calculateSMA(res) : StockTableData {
        //alert("start");
        let date = new Date();
        date = new Date(date.getTime() - 86400000);
        let dayNum = date.getDate().toString();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
        month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
        let dateString = year + "-" + month + "-" + dayNum;
        //alert("start");
        while (!res["Time Series (Daily)"].hasOwnProperty(dateString)) {
            //alert("while 1");
            date = new Date(date.getTime() - 86400000);
            dayNum = date.getDate().toString();
            year = date.getFullYear().toString();
            month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            dateString = year + "-" + month + "-" + dayNum;
        }
        //alert("finish");
        //date is set to last day with data
        let data = {
            symbol: res["Meta Data"]["2. Symbol"],
            mavg_50 : 0,
            mavg_100 : 0,
            mavg_200 : 0
        }
        let daysCounted = 0; //Represents next day to be counted with initial = 0 and total counted
        let total = 0.0;
        //alert("start " + data.symbol);
        while (daysCounted < 200) {
            //alert("while 2");
            total += parseFloat(res["Time Series (Daily)"][dateString]["4. close"]);
            daysCounted++;
            //alert(daysCounted);
            //Find next date backwards
            date = new Date(date.getTime() - 86400000);
            dayNum = date.getDate().toString();
            year = date.getFullYear().toString();
            month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            dateString = year + "-" + month + "-" + dayNum;
            //alert("start");
            let timeout = 0; //In case 50+ days not possible
            try {
                while (!res["Time Series (Daily)"].hasOwnProperty(dateString)) {
                    if (timeout > 200) throw 'timeout';
                    //alert("while 3");
                    date = new Date(date.getTime() - 86400000);
                    dayNum = date.getDate().toString();
                    year = date.getFullYear().toString();
                    month = date.getMonth().toString();
                    dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
                    month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
                    dateString = year + "-" + month + "-" + dayNum;
                    timeout++;
                }
            }
            catch (err) {
                //alert(err);
                break;
            }
            
            //alert("finish");
            //Process
            if (daysCounted == 50) {
                data.mavg_50 = total / daysCounted;
            }
            else if (daysCounted == 100) {
                data.mavg_100 = total / daysCounted;
            }
            else if (daysCounted == 200) {
                data.mavg_200 = total / daysCounted;
            }
        }

        //alert("completed");
        return data;
    }


}

interface StockTableData {
    symbol : string;
    mavg_50 : number;
    mavg_100 : number;
    mavg_200 : number;
}