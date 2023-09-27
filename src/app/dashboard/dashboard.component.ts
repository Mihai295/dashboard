import { Component, OnInit } from '@angular/core';
import { TableDataComponent } from '../table-data/table-data.component';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  termenDepasitCount: number = 0;
  termenulSeApropieCount: number = 0;
  inTermenCount: number = 0;
  constructor(private tableDataComponent: TableDataComponent, private tableDataService: TableDataService) {}

  ngOnInit() {
    this.tableDataService.filteredData$.subscribe((filteredData) => {
      this.updateFilterCounts(filteredData);
    });
  }

  updateFilterCounts(filteredData: any[]) {
    this.termenDepasitCount = filteredData.filter(item => item.statusSLA === 'Termen depasit').length;
    this.termenulSeApropieCount = filteredData.filter(item => item.statusSLA === 'Termenul se apropie').length;
    this.inTermenCount = filteredData.filter(item => item.statusSLA === 'In termen').length;
  }
}