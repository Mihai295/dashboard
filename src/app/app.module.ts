import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TableDataService } from './table-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TableDataComponent } from './table-data/table-data.component';
import { CaseModalComponent } from './case-modal/case-modal.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { ChartsModalComponent } from './charts-modal/charts-modal.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ButtonsComponent,
    TableDataComponent,
    CaseModalComponent,
    FilterModalComponent,
    ChartsModalComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
  ],
  providers: [TableDataComponent, TableDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
