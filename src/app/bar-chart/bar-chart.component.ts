import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import 'chart.js';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  template: '<canvas #barChart></canvas>',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {
  @Input() dataKey: string = '';
  @Input() label: string = '';
  @Input() data: any[] = [];

  @ViewChild('barChart') barChartElementRef!: ElementRef;

  private chartInstance: any;

  constructor() { }

  ngAfterViewInit() {
    this.refreshBarChart();
  }

  private prepareBarChartData(dataKey: string, label: string, data: any[]) {
    const dataCounts: Record<string, number> = {};
    const labels: string[] = [];
    const values: number[] = [];
    const backgroundColors: string[] = [];

    data.forEach((item: any) => {
      const dataValue = item[dataKey];
      if (dataCounts[dataValue]) {
        dataCounts[dataValue]++;
      } else {
        dataCounts[dataValue] = 1;
        labels.push(dataValue);
        backgroundColors.push('blue');
      }
    });

    labels.forEach((label) => {
      values.push(dataCounts[label]);
    });

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          backgroundColor: backgroundColors,
        },
      ],
    };
  }

  private renderBarChart(chartElementRef: ElementRef, chartData: any, chartInstance: any) {
    const chartElement = chartElementRef.nativeElement;
    const ctx = chartElement.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y',
      },
    });
  }

  public refreshBarChart() {
    const chartData = this.prepareBarChartData(this.dataKey, this.label, this.data);
    this.renderBarChart(this.barChartElementRef, chartData, this.chartInstance);
  }
}
