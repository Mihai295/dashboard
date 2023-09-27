import { Component, Output, EventEmitter } from '@angular/core';
import { tableData } from '../table-data/data';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  
  aplicatieValues: string[] = [];
  procesValues: string[] = [];
  tipDocumentValues: string[] = [];
  judetValues: string[] = [];
  uatResponsabilValues: string[] = [];
  responsabilValues: string[] = [];
  statusSLAValues: string[] = [];
  filteredData: any[] = tableData;

  selectedAplicatie:string = '';
  selectedProces: string = '';
  selectedDocument: string = '';
  selectedJudet: string = '';
  selectedUat: string = '';
  selectedResponsabil: string = '';
  selectedStatusSLA: string = '';
  selectedFromDate: string = this.getEarliestDate(); 
  selectedToDate: string = this.getOldestDate(); 

  

  constructor(private tableDataService: TableDataService) {
  }
  ngOnInit() {
    this.getUniqueValues();
  }

  getEarliestDate(): string {
    const dates = tableData.map(item => this.parseDate(item.dataLimita));
    const earliestDate = dates.reduce((earliest, currentDate) => {
      if (currentDate.getTime() < earliest.getTime()) {
        return currentDate;
      } else {
        return earliest;
      }
    });
    return this.formatDate(earliestDate);
  }
  
  getOldestDate(): string {
    const dates = tableData.map(item => this.parseDate(item.dataLimita));
    const oldestDate = dates.reduce((oldest, currentDate) => {
      if (currentDate.getTime() > oldest.getTime()) {
        return currentDate;
      } else {
        return oldest;
      }
    });
    return this.formatDate(oldestDate);
  }

  closeFilterModal() {
    this.closeModal.emit();
  }

  applyFilters() {
    const filterObject = {
      aplicatie: this.selectedAplicatie,
      proces: this.selectedProces,
      tipDocument: this.selectedDocument,
      judet: this.selectedJudet,
      uatResponsabil: this.selectedUat,
      responsabil: this.selectedResponsabil,
      statusSLA: this.selectedStatusSLA,
      fromDataLimita: this.selectedFromDate,
      toDataLimita: this.selectedToDate,  
    };
  
    if (this.isDatesDifferenceLessThanOneYear(filterObject.fromDataLimita, filterObject.toDataLimita)) {
      this.tableDataService.applyFilters(filterObject);
    } else {
      alert('The date difference must be less than one year.');
    }
  }
  
  private parseDate(dateString: string): Date {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0]) ;
      const month = parseInt(parts[1]) -1; 
      const year = parseInt(parts[2]);
      return new Date(year, month, day);
    }
    return new Date('Invalid');
  }
  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).toString().padStart(2, '0');
    const day = String(date.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private getUniqueValues() {
    this.aplicatieValues = this.getUniquePropertyValues('aplicatie');
    this.procesValues = this.getUniquePropertyValues('proces');
    this.tipDocumentValues = this.getUniquePropertyValues('tipDocument');
    this.judetValues = this.getUniquePropertyValues('judet');
    this.uatResponsabilValues = this.getUniquePropertyValues('uatResponsabil');
    this.responsabilValues = this.getUniquePropertyValues('responsabil');
    this.statusSLAValues = this.getUniquePropertyValues('statusSLA');
  }

  private getUniquePropertyValues(propertyName: string): string[] {
    const uniqueValues = new Set<string>();
    for (const item of tableData) {
      const value = (item as any)[propertyName];
      if (value !== '') {
        uniqueValues.add(value);
      }
    }
    return Array.from(uniqueValues);
  }

  private isDatesDifferenceLessThanOneYear(fromFilterDate: string, toFilterDate: string) {
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000; 
  
    const fromDate = new Date(fromFilterDate).getTime();
    const toDate = new Date(toFilterDate).getTime();
  
  
    const dateDifference = Math.abs(toDate - fromDate); 
  
    return dateDifference < oneYearInMilliseconds;
  }
  

}

export interface FilterObject extends Partial<typeof tableData[0]> {
  fromDataLimita?: string;
  toDataLimita?: string;
}
