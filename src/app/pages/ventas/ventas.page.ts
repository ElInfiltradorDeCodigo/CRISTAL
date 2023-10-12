import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  public ventas!: Observable<any[]>;

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Venta',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion();
        },
        },
        {
          text: 'Ver Detalles',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verEmpleados();
          },
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

    async eliminacion(){

    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar esta venta?',
      buttons: ['Sí','No'],
    });

    await alert.present();

  }

  verEmpleados(){

    this.router.navigate(['/detalle-venta']);

  }

  actualizarVenta(){

    this.router.navigate(['/actualizar-venta']);

  }

  ngOnInit() {

    this.ventas = this.obtenerVentas();

  }

  obtenerVentas(): Observable<any[]> {
    return this.db.list('VENTAS').valueChanges();
  }

  getCantidadProductos(venta: any): number {
    return venta.productos.length;
  }

  getNombreCompleto(nombre_cliente: any): string {
    return `${nombre_cliente.nombre} ${nombre_cliente.apellido_p} ${nombre_cliente.apellido_m}`;
  }

}
