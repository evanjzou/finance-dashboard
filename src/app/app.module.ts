import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { DataTable } from './components/app.datatable';

import { FinanceService } from './service/finance_service';

import { Tabs } from './components/tabs';
import { Tab } from './components/tab';

import { BasicChart } from './components/basic_chart';

import { SectorTable } from './components/sector_table';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HistoricalDataComponent } from './components/historical_data';
import { HistoricalDataService } from './service/historical_data_factory';
import { StockDataFactory } from './service/backend_factory';

@NgModule({
  declarations: [
    AppComponent,
    DataTable,
    Tabs,
    Tab,
    BasicChart,
    HistoricalDataComponent,
    SectorTable
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers:  [FinanceService, HistoricalDataService, StockDataFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
