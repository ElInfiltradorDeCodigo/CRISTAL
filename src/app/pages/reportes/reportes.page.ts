import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { AlertController } from '@ionic/angular';
import { UserOptions } from 'jspdf-autotable';
import { finalize } from 'rxjs/operators';
import html2canvas from 'html2canvas';

interface AutoTable extends UserOptions {
  startY?: number;
}

interface AutoTablePrevious {
  finalY: number;
}

interface jsPDFCustom extends jsPDF {
  autoTable: (options: AutoTable) => void;
  previous: AutoTablePrevious;
}

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

  constructor(
    private db: AngularFireDatabase, 
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loadChartData();
    this.loadEmployeeName();
    this.listarTickets();
  }

  loadChartData() {
    this.db.list('/VENTAS').valueChanges().pipe(
      map(sales => sales as Venta[])
    ).subscribe((sales: Venta[]) => {
      let productData: { [key: string]: number } = {};
      
      sales.forEach(sale => {
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
    const ref = this.storage.ref('reportes/');
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

  async generateAndDownloadPDF() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Quieres generar y descargar el reporte de ventas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operación cancelada');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.downloadPDF();
          }
        }
      ]
    });

    await alert.present();
  }

  async downloadPDF() {
    this.db.list('/VENTAS').valueChanges().pipe(
      map(sales => sales as Venta[])
    ).subscribe(async (sales: Venta[]) => {
      const doc = new jsPDF() as jsPDFCustom;

      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 37, 41);

      const pageWidth = doc.internal.pageSize.getWidth();

      const logoWidth = 30;
      const logoHeight = 30;
      const logoX = 15;
      const logoY = 12;
      const logoBase64 = 'data:image/jpeg;base64,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';
      
      doc.addImage(logoBase64, 'JPEG', logoX, logoY, logoWidth, logoHeight);

      const companyInfo = [
        'Productora y Maquila de Gomas Resinas de Mexico S. de R.L',
        'Carretera estatal la capilla el huasteco km.18 la Guadalupe Ver.',
        '271-219-42-031',
        'PMG110202LL5'
      ];

      const companyInfoX = (pageWidth / 2);
      const companyInfoY = 20;
      const companyInfoFontSize = 10; 

      doc.setFontSize(companyInfoFontSize);
      companyInfo.forEach((info, index) => {
        const textWidth = doc.getStringUnitWidth(info) * companyInfoFontSize / doc.internal.scaleFactor;
        const textX = companyInfoX - (textWidth / 2);
        doc.text(info, textX, companyInfoY + (index * companyInfoFontSize * 0.7)); 
      });

      const separator2Y = companyInfoY + (companyInfo.length * companyInfoFontSize * 0.65); 
      doc.setDrawColor(100, 100, 100);
      doc.line(20, separator2Y, pageWidth - 20, separator2Y);
        
      const title = 'Reporte de Ventas';
      const titleSize = 18;
      const titleWidth = doc.getStringUnitWidth(title) * titleSize / doc.internal.scaleFactor;
      const titleX = (pageWidth / 2) - (titleWidth / 2);
      const titleY = companyInfoY + 35;
      
      doc.setFontSize(titleSize);
      doc.text(title, titleX, titleY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);

      const separatorY = titleY + 5;
      doc.setDrawColor(100, 100, 100);
      doc.line(20, separatorY, pageWidth - 20, separatorY);

      const canvas = document.querySelector('canvas');
      if (canvas instanceof HTMLCanvasElement) {
        const canvasImage = await html2canvas(canvas).then(canvas => {
          return canvas.toDataURL('image/png');
        });
        const graphY = separatorY + 5;
        doc.addImage(canvasImage, 'PNG', 15, graphY, 180, 100);
      
        let yPosition = separatorY + 110;

        const verticalSpace = 10;
        yPosition += verticalSpace;

        doc.setFontSize(12);
        doc.text('Datos de los Productos:', 15, yPosition);
        yPosition += 10;

        const productos = this.barChartData[0].data as number[];
        this.barChartLabels.forEach((producto, index) => {
          doc.setFontSize(10);
          doc.text(`${producto}: ${productos[index]}`, 15, yPosition);
          yPosition += 10;

          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
        });

      } else {
        console.error('No se encontró el elemento canvas o no es un HTMLCanvasElement');
      }

      doc.addPage();;
        
      doc.setDrawColor(100, 100, 100); 
      doc.line(20, 78, pageWidth - 20, 78);

      let yPosition = 20;
      doc.setFontSize(12);
    
      sales.forEach((sale, index) => {

        const ventaTitle = `Venta ${index + 1}`;
        const ventaTitleSize = 20;
        const ventaTitleWidth = doc.getStringUnitWidth(ventaTitle) * ventaTitleSize / doc.internal.scaleFactor; 
        const ventaTitleX = (pageWidth / 2) - (ventaTitleWidth / 2);

        doc.text(ventaTitle, ventaTitleX, yPosition);
        yPosition += 10;
        doc.text(`Empleado: ${sale.empleado}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Fecha: ${sale.fecha}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Cliente: ${sale.nombre_cliente.nombre} ${sale.nombre_cliente.apellido_p} ${sale.nombre_cliente.apellido_m}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Total: ${sale.total}`, 20, yPosition);
        yPosition += 10;

        const tableData = sale.productos.map(producto => [
          producto.nombre,
          producto.cantidad,
          producto.precio.toFixed(2),
          (Number(producto.cantidad) * producto.precio).toFixed(2)
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [['Producto', 'Cantidad', 'Precio Unitario', 'Total']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [22, 160, 133], fontSize: 12 }, 
          bodyStyles: { fillColor: [233, 233, 233], textColor: 50, fontSize: 10 }, 
          alternateRowStyles: { fillColor: [0, 102, 153], textColor: 255 },
          rowPageBreak: 'avoid',
          styles: { cellPadding: 2, fontSize: 10 },
        });

        if (doc.previous && typeof doc.previous.finalY === 'number') {
          yPosition = doc.previous.finalY + 10;
        }        

        if (index !== sales.length - 1) {
          doc.addPage();
          yPosition = 20;
        }
      });

      const pageCount = doc.internal.pages.length;
  
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.text(`Página ${i} de ${pageCount}`, 100, 290, { align: 'center' });
        }

      doc.save('reporte_ventas.pdf');
      this.savePDFtoStorage(doc);
    });
  }

  async savePDFtoStorage(doc: jsPDFCustom) {
    const blob = doc.output('blob'); 
  
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const reportName = `reporte_${this.employeeName.replace(/ /g, '_')}_${formattedDate}.pdf`;
  
    const ref = this.storage.ref(`reportes/${reportName}`);
    const task = ref.put(blob);
  
    task.snapshotChanges().pipe(
      finalize(() => {
        this.alertController.create({
          header: 'Información',
          message: 'El reporte se ha guardado exitosamente en el storage.',
          buttons: ['OK']
        }).then(alert => alert.present());
      })
    ).subscribe();
  }
   
}

