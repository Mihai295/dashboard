import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiltersComponent } from './filters/filters.component';
import { TableDataComponent } from './table-data/table-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FiltersComponent,
    TableDataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TableDataComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
