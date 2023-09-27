import { Component, OnInit, OnDestroy  } from '@angular/core';
import { TableDataService } from '../table-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit, OnDestroy {
  tableData!: any;
  modalVisible = false;
  modalTitle!: string;
  comunicari: { title: string, detalii: string }[] = [];

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
  
  getCasesCount(column: string, value: string): number {
    let count = 0;
  
    for (const row of this.tableDataService.tableData) {
      if ((row as { [key: string]: any })[column] === value) {
        count++;
      }
    }
    return count;
  }

  openModal(row: any) {
    this.modalVisible = true;
    this.modalTitle = row.numarCaz;
    this.comunicari = row.comunicari;
  }
  hideModal() {
    this.modalVisible = false;
  }
}



export function compareTableData(a: any, b: any) {
  const limitComparison = compareDates(b.dataLimita, a.dataLimita);
  if (limitComparison !== 0) {
    return limitComparison;
  }

  const startComparison = compareDates(a.dataStart, b.dataStart);
  if (startComparison !== 0) {
    return startComparison;
  }

  return a.tipDocument.localeCompare(b.tipDocument);
}

function compareDates(date1: string, date2: string) {
  const [day1, month1, year1] = date1.split('-').map(Number);
  const [day2, month2, year2] = date2.split('-').map(Number);

  if (year1 !== year2) {
    return year2 - year1;
  }
  if (month1 !== month2) {
    return month2 - month1;
  }
  return day2 - day1;
}
