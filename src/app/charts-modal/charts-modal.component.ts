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
  docTypeChartData: any;
  judetChartData: any; 
  responsabilChartData: any;

  @ViewChild('pieChart') pieChartElementRef!: ElementRef;
  @ViewChild('docTypeChart') docTypeChartElementRef!: ElementRef;
  @ViewChild('judetChart') judetChartElementRef!: ElementRef;
  @ViewChild('responsabilChart') responsabilChartElementRef!: ElementRef; 

  @Output() closeModal = new EventEmitter<void>();

  tableData: any[] =[];
  piechartInstance: any; 
  docTypeChartInstance: any; 
  judetChartInstance: any; 
  responsabilChartInstance: any;
  
  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.tableDataService.filteredData$.subscribe((data) => {
      this.tableData = data;
      this.refreshPieChart();
      this.refreshBarChart('tipDocument', 'Numar de cazuri', this.docTypeChartElementRef, this.docTypeChartInstance);
      this.refreshBarChart('judet', 'Numar de cazuri', this.judetChartElementRef, this.judetChartInstance);
      this.refreshBarChart('responsabil', 'Numar de cazuri', this.responsabilChartElementRef, this.responsabilChartInstance);
    });
  }

  ngAfterViewInit() {
    this.refreshPieChart() 
    this.refreshBarChart('tipDocument', 'Numar de cazuri', this.docTypeChartElementRef, this.docTypeChartInstance);
    this.refreshBarChart('judet', 'Numar de cazuri', this.judetChartElementRef, this.judetChartInstance);
    this.refreshBarChart('responsabil', 'Numar de cazuri', this.responsabilChartElementRef, this.responsabilChartInstance);
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
      options: {}
    });
  }

  private refreshPieChart() {
    this.prepareStatusSLAData();
    this.renderPieChart();
  }

  private prepareBarChartData(dataKey: string, label: string) {
    const dataCounts: Record<string, number> = {};
    const labels: string[] = [];
    const values: number[] = [];
    const backgroundColors: string[] = [];
  
    this.tableData.forEach((item: any) => {
      const dataValue = item[dataKey];
      if (dataCounts[dataValue]) {
        dataCounts[dataValue]++;
      } else {
        dataCounts[dataValue] = 1;
        labels.push(dataValue);
        backgroundColors.push('blue'); 
      }
    });
  
    labels.forEach(label => {
      values.push(dataCounts[label]);
    });
  
    return {
      labels,
      datasets: [{
        label,
        data: values,
        backgroundColor: backgroundColors,
      }],
    };
  }

  private renderBarChart(chartElementRef: ElementRef, chartData: any, chartInstance: any) {
    const chartElement = chartElementRef.nativeElement;
    const ctx = chartElement.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y',
      },
    });
  }

  private refreshBarChart(dataKey: string, label: string, chartElementRef: ElementRef, chartInstance: any) {
    const chartData = this.prepareBarChartData(dataKey, label);
    this.renderBarChart(chartElementRef, chartData, chartInstance);
  }
}
