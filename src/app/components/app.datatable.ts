import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { QuoteResult } from '../service/finance_service'

@Component({
    selector: 'data-table',
    templateUrl: '../templates/app.component.datatable.html',
    styleUrls: ['../styles/app.component.datatable.css']
})
export class DataTable {
    @Input() companies: QuoteResult[];
}