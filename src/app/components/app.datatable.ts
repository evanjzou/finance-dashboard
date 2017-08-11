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
    @Input() indexData: CompanyData[];
    @Input() stockData;

    dispData = {};
    indices = {};
    yesterday : string; 
    keys = [];
    
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
                symbol: companies[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
            this.keys.push(companies[i]);
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
            /*this.keys.push(companies[i]);
            this.companyData[i].dailySeriesData.subscribe(
                this.generateData.bind(this),
                this.historyServiceErrorHandle,
                this.completionHandler
            ) */
        } 
        this.stockData.subscribe(
            (function (res) {
                //alert("Call returned");
                //alert(res[0].symbol);
                for (let j = 0; j < res.length; j++) {
                    this.dispData[res[j].symbol] = {
                        symbol: res[j].symbol,
                        mavg_50 : res[j].mavg50,
                        mavg_100 : res[j].mavg100,
                        mavg_200 : res[j].mavg200,
                        month3Volume : res[j].month3vol,
                        day10Volume : res[j].day10vol,
                        percentChange5Day : res[j].percentchange5d,
                        currentPrice: res[j].current_price,
                        pivotavg : res[j].pivotavg,
                        gappresent : res[j].gappresent,
                        rangeExp : res[j].ranges[res[j].ranges.length - 1] > 
                            res[j].ranges[res[j].ranges.length - 2]
                    }
                }
            }).bind(this),
            function (err) {

            },
            this.completionHandler
        );
        
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
        /*let date = new Date();
        date = new Date(date.getTime() - 86400000);
        let dayNum = date.getDate().toString();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
        month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month; */
        let dateString = this.getDateString(1); // year + "-" + month + "-" + dayNum; 
        //alert("start");
        /*while (!res["Time Series (Daily)"].hasOwnProperty(dateString)) {
            //alert("while 1");
            date = new Date(date.getTime() - 86400000);
            dayNum = date.getDate().toString();
            year = date.getFullYear().toString();
            month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            dateString = year + "-" + month + "-" + dayNum;
        } */
        dateString = this.getNextDayBack(res, dateString);
        //alert("finish");
        //date is set to last day with data
        let data = {
            symbol: res["Meta Data"]["2. Symbol"],
            mavg_50 : 0,
            mavg_100 : 0,
            mavg_200 : 0,
            month3Volume : 0,
            day10Volume : 0,
            percentChange5Day : 0,
            currentPrice: 0
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
            /*date = new Date(date.getTime() - 86400000);
            dayNum = date.getDate().toString();
            year = date.getFullYear().toString();
            month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            dateString = year + "-" + month + "-" + dayNum;
            //alert("start");
            let timeout = 0; //In case 50+ days not possible */
            try {
                /*while (!res["Time Series (Daily)"].hasOwnProperty(dateString)) {
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
                } */
                dateString = this.getNextDayBack(res, dateString);
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

    //Wrapper callback
    private generateData(res) : void {
        this.calculateSMAData(res);
        this.setVolumeData(res);
        this.setPercentChange(res);
        this.setCurrentPrice(res);
    }

    private setVolumeData(res) : void {
        this.dispData[res["Meta Data"]["2. Symbol"]].month3Volume = this.averageVolume(res, 90);
        this.dispData[res["Meta Data"]["2. Symbol"]].day10Volume = this.averageVolume(res, 10);
    } 

    private setPercentChange(res) : void {
        this.dispData[res["Meta Data"]["2. Symbol"]].percentChange5Day = this.calculate5DayPercentChange(res);
    }

    private calculate5DayPercentChange(res) : number {
        let date = this.getDateString(0);
        date = this.getNextDayBack(res, date);
        let fiveDaysAgo = date;
        for (let i = 0; i < 5; i++) {
            try {
                fiveDaysAgo = this.getNextDayBack(res, fiveDaysAgo);
            }
            catch (err) {
                return 0;
            }
        }
        return ((res["Time Series (Daily)"][date]["4. close"] - 
            res["Time Series (Daily)"][fiveDaysAgo]["4. close"]) / 
                res["Time Series (Daily)"][fiveDaysAgo]["4. close"]) * 100;
    }

    private averageVolume(res, days : number) : number {
        let date = this.getDateString(0);
        date = this.getNextDayBack(res, date);
        let totalVolume = 0;
        for (let i = 0; i < days; i++) {
            totalVolume += parseFloat(res["Time Series (Daily)"][date]["5. volume"]);
            try {
                date = this.getNextDayBack(res, date);
            }
            catch(err) {
                return 0;
            }
        }
        return totalVolume / days;
    }

    private getNextDayBack(res, current : string) : string {
        let date = new Date(current);
        let dayNum = date.getDate().toString();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
        month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
        let dateString = year + "-" + month + "-" + dayNum;
        let timeout = 0; //In case 50+ days not possible
        while (!res["Time Series (Daily)"].hasOwnProperty(dateString)) {
            if (timeout > 200) throw 'timeout';
            date = new Date(date.getTime() - 86400000);
            dayNum = date.getDate().toString();
            year = date.getFullYear().toString();
            month = date.getMonth().toString();
            dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
            month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
            dateString = year + "-" + month + "-" + dayNum;
            timeout++;
        }
        return dateString;
    }

    private getDateString(offset : number)  {
        let date = new Date((new Date()).getTime() - (offset * 86400000));
        let dayNum = date.getDate().toString();
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        dayNum = parseInt(dayNum) < 10 ? "0" + dayNum : dayNum;
        month = parseInt(month) + 1 < 10  ? "0" + (parseInt(month) + 1) : month;
        let dateString = year + "-" + month + "-" + dayNum;
        return dateString;
    }

    private processIndex(res) : void {
        this.indices[res["Meta Data"]["2. Symbol"]] = {
            //TBD
        }
    }

    private setCurrentPrice(res) : void {
        let lastRefreshed = res["Meta Data"]["3. Last Refreshed"];
        this.dispData[res["Meta Data"]["2. Symbol"]].currentPrice = 
            parseFloat(res["Time Series (Daily)"][lastRefreshed]["4. close"]);

    }

    /**
     * Returns current price > 50 day moving average > 100 day moving average >
     * 200 day moving average
     * @param company
     */
    public mavgUpSlope(company : string) : boolean {
        if (this.dispData[company].currentPrice === undefined) return false;
        return this.dispData[company].currentPrice > this.dispData[company].mavg_50 &&
            this.dispData[company].mavg_50 > this.dispData[company].mavg_100 && 
                this.dispData[company].mavg_100 > this.dispData[company].mavg_200;
    }

    /**
     * Returns 10 day volume > 3 month volume
     * @param company 
     */
    public volCompare(company : string) : boolean {
        if (this.dispData[company].day10Volume === undefined) return false;
        return this.dispData[company].day10Volume > this.dispData[company].month3Volume
    }

}

interface StockTableData {
    symbol : string;
    mavg_50 : number;
    mavg_100 : number;
    mavg_200 : number;
}