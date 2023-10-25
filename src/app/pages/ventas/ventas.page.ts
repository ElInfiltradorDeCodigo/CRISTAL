import { Component, OnInit } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  public ventas!: Observable<any[]>;
  private ventasSubject = new BehaviorSubject<any[]>([]);
  allVentas: any[] = []; 
  filteredVentas: any[] = [];  
  showSearchBar = false;

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase,
    private toastCtrl: ToastController) { }

    async presentActionSheet(ventaId: string) {
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
            this.eliminacion(ventaId);
        },
        },
        {
          text: 'Ver Detalles',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verDetallesVenta(ventaId);
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

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }  

  async eliminacion(ventaId: string) {
    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar esta venta?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.db.object(`VENTAS/${ventaId}`).remove().then(() => {
              this.showToast('Venta eliminada con éxito', 'success');
            }).catch(error => {
              this.showToast('Error al eliminar la venta', 'danger');
            });
          }
        },
        'No'
      ],
    });
    await alert.present();
  } 

  verDetallesVenta(ventaId: string) {
    this.router.navigate(['/detalle-venta', ventaId]);
}

  actualizarVenta(){

    this.router.navigate(['/actualizar-venta']);

  }

  ngOnInit() {
    this.db.list('VENTAS').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.val() as any;
          const key = a.key;
          return { key, ...data };
        })
      )
    ).subscribe(data => {
      this.allVentas = data;
      this.ventasSubject.next(this.allVentas);
    });
    
    this.ventas = this.ventasSubject.asObservable();
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

  filterItems(event: Event) {
    const searchTerm = (event as CustomEvent).detail.value.toLowerCase();
  
    if (!searchTerm) {
      this.ventasSubject.next(this.allVentas);
      return;
    }
  
    const filtered = this.allVentas.filter(venta => {
      const nombreCompleto = this.getNombreCompleto(venta.nombre_cliente).toLowerCase();
      return nombreCompleto.includes(searchTerm) || venta.fecha.toLowerCase().includes(searchTerm);
    });
  
    this.ventasSubject.next(filtered);
  }
  
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.ventasSubject.next(this.allVentas);
    }
  }  

}
