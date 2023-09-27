import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import 'chart.js';
import { Chart } from 'chart.js';
import { TableDataService } from '../table-data.service';
import { registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts-modal',
  templateUrl: './charts-modal.component.html',
  styleUrls: ['./charts-modal.component.css']
})
export class ChartsModalComponent implements OnInit, AfterViewInit {
  piechartData: any;
  barChartData: any;
  @ViewChild('pieChart') pieChartElementRef!: ElementRef;
  @ViewChild('barChart') barChartElementRef!: ElementRef;

  @Output() closeModal = new EventEmitter<void>();

  tableData: any[] =[];
  piechartInstance: any; 
  barChartInstance: any; 
  
  
  


  constructor(private tableDataService: TableDataService) { }
  ngOnInit() {
    this.tableDataService.filteredData$.subscribe((data) => {
      this.tableData = data;
      this.refreshPieChart();
      this.refreshbarChart();
    });
  }

  ngAfterViewInit() {
    this.refreshPieChart() 
    this.refreshbarChart(); 
  }

  
  closeChartsModal() {
    this.closeModal.emit();
  }


  private prepareStatusSLAData() {
    const statusSLACounts: Record<string, number> = {};
    const backgroundColors: string[] = [];

    const statusSLAColors: Record<string, string> = {
      'Termen depasit': 'red',
      'Termenul se apropie': 'orange',
      'In termen': 'green',
    };

    this.tableData.forEach((item: any) => {
      const statusSLA = item.statusSLA;
      if (statusSLACounts[statusSLA]) {
        statusSLACounts[statusSLA]++;
      } else {
        statusSLACounts[statusSLA] = 1;
        backgroundColors.push(statusSLAColors[statusSLA] || 'gray');
      }

    });
    
  
    const labels = Object.keys(statusSLACounts);
    const values = labels.map(label => statusSLACounts[label]);
  
    this.piechartData = {
      labels,
      data: values,
      backgroundColor: backgroundColors
    };
  }

  private renderPieChart() {
    const pieChartElement = this.pieChartElementRef.nativeElement;
    const ctx = pieChartElement.getContext('2d');

    if (this.piechartInstance) {
      this.piechartInstance.destroy(); 
    }

    this.piechartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.piechartData.labels,
        datasets: [{
          data: this.piechartData.data,
          backgroundColor: this.piechartData.backgroundColor
        }]
      },
      options: {
      }
    });
  }

  private prepareTipDocumentData() {
    const tipDocumentCounts: Record<string, number> = {};
    const labels: string[] = [];
    const values: number[] = [];
    const backgroundColors: string[] = [];
  
    this.tableData.forEach((item: any) => {
      const tipDocument = item.tipDocument;
      if (tipDocumentCounts[tipDocument]) {
        tipDocumentCounts[tipDocument]++;
      } else {
        tipDocumentCounts[tipDocument] = 1;
        labels.push(tipDocument);
        backgroundColors.push('blue'); 
      }
    });
  
    labels.forEach(label => {
      values.push(tipDocumentCounts[label]);
    });
  
    this.barChartData = {
      labels,
      datasets: [{
        label: 'Numar de cazuri',
        data: values,
        backgroundColor: backgroundColors,
      }],
    };
  }

  private renderbarChart() {
    const barChartElement = this.barChartElementRef.nativeElement;
    const ctx = barChartElement.getContext('2d');

    if(this.barChartInstance){
      this.barChartInstance.destroy();
    }
  
    this.barChartInstance = new Chart(ctx, {
      type: 'bar', // Use 'bar' for Bar Chart
      data: this.barChartData,
      options: {
        indexAxis: 'y',
      },
    });
  }

  private refreshbarChart() {
    this.prepareTipDocumentData();
    this.renderbarChart();
  }


  private refreshPieChart() {
    this.prepareStatusSLAData();
    this.renderPieChart();
  }
    
}
