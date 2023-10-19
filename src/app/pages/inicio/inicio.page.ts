import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

interface Venta {
  empleado: string;
  fecha: string;
  nombre_cliente: Cliente;
  productos: Producto[];
  telefono_cliente: string;
  total: string;
}

interface Cliente {
  apellido_m: string;
  apellido_p: string;
  estado: string;
  imageUrl: string;
  localidad: string;
  nombre: string;
  telefono: string;
}

interface Producto {
  cantidad: string;
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  private COLORS = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
  ];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: { data: number[]; label: string; backgroundColor: string[] }[] = [
    { data: [], label: 'Cantidad En Base A La Unidad Medida', backgroundColor: [] } 
];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.db.list('/VENTAS').valueChanges().subscribe((sales: any) => {

      const typedSales = sales as Venta[];

      let productData: { [key: string]: number } = {};
      
      typedSales.forEach(sale => {
        sale.productos.forEach(product => {
          if (!productData[product.nombre]) {
            productData[product.nombre] = 0;
          }
          productData[product.nombre] += +product.cantidad;
        });
      });      

  this.barChartLabels = Object.keys(productData);
  this.barChartData[0].data = Object.values(productData);
  this.barChartData[0].backgroundColor = this.barChartLabels.map((_, index) => this.COLORS[index % this.COLORS.length]);
  });

  }
}
