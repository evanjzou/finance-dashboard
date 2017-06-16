import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { FinanceService } from './service/finance_service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers:  [FinanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
