import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = ['Cuchillas R-2', 'Cuchillas R-1', 'Canaletas', 'Acido Formico', 'Alambre Cal. 12'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [108, 98, 500, 84, 250], label: 'Cantidad En Base A La Unidad Medida', backgroundColor: [
      'rgba(255, 99, 132, 0.5)',   // Color de la primera barra
      'rgba(54, 162, 235, 0.5)',  // Color de la segunda barra
      'rgba(255, 206, 86, 0.5)',  // Color de la tercera barra
      'rgba(75, 192, 192, 0.5)',  // Color de la cuarta barra
      'rgba(153, 102, 255, 0.5)', // Color de la quinta barra
    ], },
  ];

  constructor() { }

  ngOnInit() {
  }

}
