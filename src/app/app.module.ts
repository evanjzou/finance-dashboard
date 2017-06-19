import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './components/app.component';
import { DataTable } from './components/app.datatable';

import { FinanceService } from './service/finance_service';

@NgModule({
  declarations: [
    AppComponent,
    DataTable
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers:  [FinanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
