import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sector-table',
    templateUrl: '../templates/sector_table.html',
    styleUrls: ['../styles/sector_table.css']
})
export class SectorTable  implements OnInit{
    @Input() dispData;
    keys;

    ngOnInit() {
        this.keys = Object.keys(this.dispData);
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