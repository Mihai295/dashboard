import { Component } from '@angular/core';
import { TableDataComponent } from '../table-data/table-data.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private tableDataComponent: TableDataComponent) {}

  useGetCasesCount(column: string, value: string): number {
    const casesCount = this.tableDataComponent.getCasesCount(column, value);
    return casesCount;
  }
}