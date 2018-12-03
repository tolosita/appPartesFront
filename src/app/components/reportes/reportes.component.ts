import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: []
})
export class ReportesComponent implements OnInit {

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  //pieChartColors: string[] = [];

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.reportsService.comparendosRealizados().then((data: any[]) => {
      console.log(data.map(item => item.tipoInfraccion));

      this.pieChartLabels.push(...data.map(item => item.tipoInfraccion));
      this.pieChartData = data.map(item => item.repeticiones);
    });

  }

}
