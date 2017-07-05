import { Component,  Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { companies } from '../constants';

@Component({
  selector: 'historical-data',
  templateUrl: '../templates/historical_data.html',
  styleUrls: ['../styles/historical_data.css'],
  providers: [] //To be changed
})
export class HistoricalDataComponent {
    
    @Input() private company_data;

}