import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableDataService } from '../table-data.service';
import { Subscription } from 'rxjs';
import { compareTableData } from '../table-data/table-data.component';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit, OnDestroy{
  piechartData!: any;
  filterModalVisible = false;
  filterChartsVisible = false;
  graficeModalVisible = false;
  tableData: any =[];
  private dataSubscription!: Subscription;

  constructor(private tableDataService: TableDataService) { }

    ngOnInit() {
      this.dataSubscription = this.tableDataService.filteredData$.subscribe((data) => {
        this.tableData = data;
        this.tableData.sort(compareTableData);
      });

    }

    ngOnDestroy() {
      this.dataSubscription.unsubscribe();
    }

  openFilterModal() {
    this.filterModalVisible = true; 
  }
  closeFilterModal() {
    this.filterModalVisible = false; 
  }

  openGraficeModal() {
    this.graficeModalVisible = true;
  }

  closeGraficeModal() {
    this.graficeModalVisible = false;
  }

}
