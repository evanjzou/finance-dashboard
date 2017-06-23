import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './components/app.component';
import { DataTable } from './components/app.datatable';

import { FinanceService } from './service/finance_service';

import { Tabs } from './components/tabs';
import { Tab } from './components/tab';

import { BasicChart } from './components/basic_chart';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DataTable,
    Tabs,
    Tab,
    BasicChart
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers:  [FinanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
