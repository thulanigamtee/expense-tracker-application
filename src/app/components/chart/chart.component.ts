import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart',
  template: `
    <div class="chart">
      <p>Categories based on amounts</p>
      <canvas
        baseChart
        [data]="doughnutChartData"
        [labels]="doughnutChartLabels"
        [type]="'doughnut'"
      >
      </canvas>
    </div>
  `,
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  sumOfSalaryTransactions: number = 0;
  sumOfAllCategories: number = 0;

  categorySums: { [key: string]: number } = {};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getSumOfAllCategories().then((categorySums) => {
      this.updateDoughnutChartData(categorySums);
    });
  }

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  updateDoughnutChartData(categorySums: { [key: string]: number }) {
    const categorySumValues = Object.values(categorySums);

    this.doughnutChartLabels = Object.keys(categorySums);

    if (categorySumValues.length === this.doughnutChartLabels.length) {
      this.doughnutChartData.labels = this.doughnutChartLabels;
      this.doughnutChartData.datasets[0].data = categorySumValues;
    } else {
      console.error('Category sums do not match the number of labels.');
    }
  }

  public doughnutChartType: ChartType = 'doughnut';

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
