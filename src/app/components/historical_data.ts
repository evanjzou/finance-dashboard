import { Component,  Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { companies } from '../constants';
import { CompanyData } from '../service/historical_data_factory'

@Component({
  selector: 'historical-data',
  templateUrl: '../templates/historical_data.html',
  styleUrls: ['../styles/historical_data.css'],
  providers: [] //To be changed
})
export class HistoricalDataComponent implements OnInit {
    
    @Input() private company_data : CompanyData[];
    private volatilityData : VolatilityData[];

    ngOnInit() : void {
      //TODO
    }

    private generateVolatilityData() : void {
      //TODO: convert company_data to VolatilityData
    }
}

interface VolatilityData {
  symbol: string;
  range: number; //Difference between high and low
}