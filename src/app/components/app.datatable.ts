import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { QuoteResult } from '../service/finance_service';
import { CompanyData } from '../service/historical_data_factory';
import { companies, financeCompanies, healthCareCompanies, 
    consumerDiscretionary, energy, industrials,  materials, 
    utilities, realEstate, consumerStaples, teleComm, favorites} from '../constants';
import { allCompanies } from '../constants';

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

    //Display data by sector
    dispData = {}; //Tech
    financeDispData = {};
    healthDispData = {};
    cDisDispData = {}; //Consumer discretionary
    energyDispData = {};
    industrialsDispData = {};
    materialsDispData = {};
    utilDispData = {};
    realDispData = {};
    conSDispData = {};
    teleComDispData = {};
    favoritesDispData = {};

    //ActiveSector
    activeSector = "FAV";

    //Unused
    indices = {};
    yesterday : string; 
    keys = [];
    
    ngOnInit() {
        this.initializeDispData();
        this.fetchStockData();
    }

    private historyServiceErrorHandle(err) : void {
        throw 'Error Retrieving Historical Data';
    }

    private completionHandler() : void {
        console.log("Completed");
    }

    /**
     * Initializes the display data with default fields
     */
    private initializeDispData() : void {
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
        } 

        for (let i = 0; i < financeCompanies.length; i++) {
            this.financeDispData[financeCompanies[i]] = {
                symbol: financeCompanies[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 

        for (let i = 0; i < healthCareCompanies.length; i++) {
            this.healthDispData[healthCareCompanies[i]] = {
                symbol: healthCareCompanies[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 

        for (let i = 0; i < consumerDiscretionary.length; i++) {
            this.cDisDispData[consumerDiscretionary[i]] = {
                symbol: consumerDiscretionary[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        }

        for (let i = 0; i < energy.length; i++) {
            this.energyDispData[energy[i]] = {
                symbol: energy[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        }

        for (let i = 0; i < industrials.length; i++) {
            this.industrialsDispData[industrials[i]] = {
                symbol: industrials[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 

        for (let i = 0; i < materials.length; i++) {
            this.materialsDispData[materials[i]] = {
                symbol: materials[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 

        for (let i = 0; i < utilities.length; i++) {
            this.utilDispData[utilities[i]] = {
                symbol: utilities[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 

        for (let i = 0; i < realEstate.length; i++) {
            this.realDispData[realEstate[i]] = {
                symbol: realEstate[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 

        for (let i = 0; i < consumerStaples.length; i++) {
            this.conSDispData[consumerStaples[i]] = {
                symbol: consumerStaples[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 

        for (let i = 0; i < teleComm.length; i++) {
            this.teleComDispData[teleComm[i]] = {
                symbol: teleComm[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 
        for (let i = 0; i < favorites.length; i++) {
            this.favoritesDispData[favorites[i]] = {
                symbol: favorites[i],
                mavg_50 : 0,
                mavg_100 : 0,
                mavg_200 : 0,
                month3Volume : 0,
                day10Volume : 0,
                percentChange5Day : 0,
                currentPrice: 0,
                pivotavg: 0
            } 
        } 
    }

    private fetchStockData() : void {
        this.stockData.subscribe(
            (function (res) {
                for (let j = 0; j < res.length; j++) {
                    if (res[j].sector == 'TECH') {
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
                    else if (res[j].sector == 'FINA') {
                        this.financeDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'HECA') {
                        this.healthDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'COND') {
                        this.cDisDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'ENER') {
                        this.energyDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'INDU') {
                        this.industrialsDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'MATE') {
                        this.materialsDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'UTIL') {
                        this.utilDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'REAL') {
                        this.realDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'CONS') {
                        this.conSDispData[res[j].symbol] = {
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
                    else if (res[j].sector == 'TELC') {
                        this.teleComDispData[res[j].symbol] = {
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

                    if (favorites.indexOf(res[j].symbol) > -1){
                        this.favoritesDispData[res[j].symbol] = {
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
                }    
                //alert(this.dispData['ATVI'].mavg_50);
                //alert(this.financeDispData['AMG'].mavg_50);
            }).bind(this),
            function (err) {

            },
            this.completionHandler
        );
    }

    setActiveSector(newSector) : void {
        this.activeSector = newSector;
        //alert('Sector changed');
    }

}

interface StockTableData {
    symbol : string;
    mavg_50 : number;
    mavg_100 : number;
    mavg_200 : number;
}