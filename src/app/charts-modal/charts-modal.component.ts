import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import 'chart.js';
import { Chart } from 'chart.js';
import { TableDataService } from '../table-data.service';
import { registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts-modal',
  templateUrl: './charts-modal.component.html',
  styleUrls: ['./charts-modal.component.css'],
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

  tableData: any[] = [];
  piechartInstance: any;

  constructor(private tableDataService: TableDataService) {}

  ngOnInit() {
    this.tableDataService.filteredData$.subscribe((data) => {
      this.tableData = data;
      this.refreshPieChart();
    });
  }

  ngAfterViewInit() {
    this.refreshPieChart();
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
    const values = labels.map((label) => statusSLACounts[label]);

    this.piechartData = {
      labels,
      data: values,
      backgroundColor: backgroundColors,
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
        datasets: [
          {
            data: this.piechartData.data,
            backgroundColor: this.piechartData.backgroundColor,
          },
        ],
      },
      options: {},
    });
  }

  private refreshPieChart() {
    this.prepareStatusSLAData();
    this.renderPieChart();
  }
}
