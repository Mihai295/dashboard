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
      
      for (const key of Object.keys(filterObject) as Array<keyof FilterObject>) {
        if (key === 'fromDataLimita' || key === 'toDataLimita') {
        // date range filtering
        const itemDate = this.formatDate(item['dataLimita']);
        const fromFilterDate = filterObject['fromDataLimita'] ? filterObject['fromDataLimita'] : '';
        const toFilterDate = filterObject['toDataLimita'] ? filterObject['toDataLimita'] : '';
        
        if (fromFilterDate && toFilterDate) {
          const comparisonFrom = this.compareDates(itemDate, fromFilterDate);
          const comparisonTo = this.compareDates(itemDate, toFilterDate);

          if (comparisonFrom < 0 || comparisonTo > 0) {
            isMatch = false;
            break; 

          }
        } 
      }
      else if (filterObject[key] && item[key] !== filterObject[key]) {
        isMatch = false;
        break; 
      }
      }
  
      return isMatch;
    });
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
