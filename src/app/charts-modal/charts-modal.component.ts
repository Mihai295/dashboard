import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-charts-modal',
  templateUrl: './charts-modal.component.html',
  styleUrls: ['./charts-modal.component.css'],
})
export class ChartsModalComponent implements OnInit, AfterViewInit {
  @Output() closeModal = new EventEmitter<void>();
  
  tableData: any[] = [];
  piechartData: any = {};
  
  constructor(private tableDataService: TableDataService) {}

  ngOnInit() {
    this.tableDataService.filteredData$.subscribe((data) => {
      this.tableData = data;
      // You can add code here to handle the updated data if needed.
    });
  }

  ngAfterViewInit() {
    // Add any post-view initialization code if necessary.
  }

  closeChartsModal() {
    this.closeModal.emit();
  }

  // Other methods and properties unrelated to the pie chart and SLA data can remain here.
}
