import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  public employeeName: string = 'Cargando...';

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

  public listaDeTickets: any[] = [];

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,private storage: AngularFireStorage) { }

  ngOnInit() {
    this.loadChartData();
    this.loadEmployeeName();
    this.listarTickets();
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

  async listarTickets() {
    const ref = this.storage.ref('ventas/');
    ref.listAll().subscribe(async result => {
      this.listaDeTickets = await Promise.all(result.items.map(async item => {
        const url = await item.getDownloadURL();
        return { nombre: item.name, url };
      }));
    });
  }

  loadEmployeeName() {
    this.afAuth.user.subscribe(user => {
        if (user) {
            const currentEmployeeId = user.uid;
            this.db.object(`/EMPLEADOS/${currentEmployeeId}`).valueChanges().subscribe((employee: any) => {
                if (employee && employee.nombre && employee.apellido_p && employee.apellido_m) {
                    this.employeeName = `${employee.nombre} ${employee.apellido_p} ${employee.apellido_m}`;
                } else {
                    this.employeeName = 'Empleado desconocido';
                }
            });
        } else {
            this.employeeName = 'No autenticado';
        }
    });
}

descargarTicket(url: string) {
  
  window.open(url, '_blank');
}

}
