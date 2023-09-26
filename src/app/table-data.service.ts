import { Injectable } from '@angular/core';
import { tableData } from './table-data/data';
import { BehaviorSubject } from 'rxjs';
import { FilterObject } from './filter-modal/filter-modal.component';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  tableData = tableData;
  filteredData = [...tableData];

  private filteredDataSubject = new BehaviorSubject<any[]>(tableData);


  constructor() { }

  get filteredData$() {
    return this.filteredDataSubject.asObservable();
  }

  applyFilters(filterObject: FilterObject) {
    this.filteredData = this.tableData.filter((item) => {
      let isMatch = true;
      
      // Check each filter property and compare it with the corresponding data property
      for (const key of Object.keys(filterObject) as Array<keyof FilterObject>) {
        if (key === 'fromDataLimita' || key === 'toDataLimita') {
        // Handle date range filtering
        const itemDate = this.formatDate(item['dataLimita']);
        const fromFilterDate = filterObject['fromDataLimita'] ? filterObject['fromDataLimita'] : '';
        const toFilterDate = filterObject['toDataLimita'] ? filterObject['toDataLimita'] : '';
        
        if (fromFilterDate && toFilterDate) {
          // Use compareDates function to compare the dates
          const comparisonFrom = this.compareDates(itemDate, fromFilterDate);
          const comparisonTo = this.compareDates(itemDate, toFilterDate);

          // Check if itemDate is outside the date range
          if (comparisonFrom < 0 || comparisonTo > 0) {
            isMatch = false;
            console.log('de la: ' + fromFilterDate + 'la ' + toFilterDate + 'iar data este ' + itemDate);
            break; // No need to check further

          }
        } 
      }
      else if (filterObject[key] && item[key] !== filterObject[key]) {
        isMatch = false;
        break; // No need to check further
      }
      }
  
      return isMatch;
    });
    console.log(this.filteredData);
    this.filteredDataSubject.next(this.filteredData);
  }

  private formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('-').map(Number);
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate;
  }
  
  private compareDates(date1: string, date2: string) {
  
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  }
  
}
