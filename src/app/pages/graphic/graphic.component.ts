import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { GraphicDataService } from '../../services/graphic-data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

const LineChartOptions: ChartConfiguration['options'] = {
  elements: {
    line: {
      tension: 0.5,
    },
  },
  plugins: {
    legend: { display: true },
  },
};

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, NgChartsModule, NavbarComponent],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent {
  lineChartData$ = this.graphicDataService.data$;

  lineChartOptions = LineChartOptions;

  constructor(private graphicDataService: GraphicDataService) {}

  changeGraphicValue(month: string) {
    this.graphicDataService.changeGraphicValue(month).subscribe();
  }
}
