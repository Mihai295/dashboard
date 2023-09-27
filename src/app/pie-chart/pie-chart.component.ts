import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import 'chart.js';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  template: '<canvas #pieChart></canvas>',
})
export class PieChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() tableData: any[] =[]; 

  @ViewChild('pieChart') pieChartElementRef!: ElementRef;
  piechartInstance: any;

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.refreshPieChart();
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['tableData']){
      setTimeout(() => {
        this.refreshPieChart();
      }, 10);
    }
  }

  private prepareStatusSLAData() {
    // You can now access tableData here
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

    return {
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

    const data = this.prepareStatusSLAData();

    this.piechartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
            backgroundColor: data.backgroundColor,
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
