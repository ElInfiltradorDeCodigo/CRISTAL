import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  productores!: Observable<any[]>;
  private _productores = new BehaviorSubject<any[]>([]);
  selectedProductor: any;

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase, private storage: AngularFireStorage,
    private toastCtrl: ToastController) { }

    async presentActionSheet(productor: any) {
    this.selectedProductor = productor;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Productor',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar Productor',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion();
        },
        },
        {
          text: 'Ver Información',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verPerfil();
          },
        },
        {
          text: 'Actualizar Información',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.actualizarEmpleado();
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

  async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }  

  async eliminacion() {
    if (!this.selectedProductor) {
        console.error('selectedProductor no está definido.');
        return;
    }
    const alert = await this.alertController.create({
        header: '¡Advertencia!',
        message: '¿Realmente desea eliminar este productor?',
        buttons: [
            {
                text: 'Sí',
                handler: () => {
                    this.eliminarProductor(this.selectedProductor.key, this.selectedProductor.imageUrl);
                }
            },
            'No'
        ],
    });

    await alert.present();
}

  verPerfil(){
    this.router.navigate(['/perfil-productor', { productor: JSON.stringify(this.selectedProductor) }]);
  }


  actualizarEmpleado(){
    this.router.navigate(['/actualizar-productor', { productor: JSON.stringify(this.selectedProductor) }]);
  }  


  ngOnInit() {

    this.cargarProductores();

  }

  cargarProductores() {
    this.db.list('PRODUCTORES').snapshotChanges().subscribe(productoresSnap => {
      const productoresData = productoresSnap.map(productor => {
        return {
          key: productor.key,
          ...productor.payload.val() as any
        }
      });
      this._productores.next(productoresData);
    });

    this.productores = this._productores.asObservable();
}

async eliminarProductor(productorKey: string, imageUrl: string) {
  try {
      
      const imageRef = this.storage.refFromURL(imageUrl);
      await imageRef.delete().toPromise();
      
      await this.db.object(`PRODUCTORES/${productorKey}`).remove();
      
      this.showToast("Productor eliminado con éxito", 'success');
      
  } catch (error) {
      console.error("Error al eliminar productor: ", error);
      this.showToast("Error al eliminar productor", 'danger');
  }
}

}
