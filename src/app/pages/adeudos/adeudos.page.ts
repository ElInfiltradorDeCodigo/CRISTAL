import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adeudos',
  templateUrl: './adeudos.page.html',
  styleUrls: ['./adeudos.page.scss'],
})
export class AdeudosPage implements OnInit {

  adeudosData = new BehaviorSubject<any[]>([]);
  subscription!: Subscription;
  adeudos = this.adeudosData.asObservable();

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase,private toastController: ToastController) { }

    async presentActionSheet(key: string, adeudo: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Adeudo',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar Adeudo',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion(key);
        },
        },
        {
          text: 'Ver Detalle',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verEmpleados(adeudo);
          },
        },
        {
          text: 'Actualizar Adeudo',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.actualizarVenta(adeudo, key);
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }  

  async eliminacion(key: string) {
    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar este adeudo?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.db.list('ADEUDOS').remove(key).then(() => {
              
              this.presentToast('Adeudo eliminado con éxito', 'success');
            }).catch((error) => {
              
              this.presentToast('Error al eliminar el adeudo', 'danger');
            });
          }
        },
        'No'
      ],
      backdropDismiss: false,
    });
  
    await alert.present();
  }  

  verEmpleados(adeudo: any){
    this.router.navigate(['/detalle-adeudo', { adeudo: JSON.stringify(adeudo) }]);
}  

actualizarVenta(adeudo: any, key: string){
  this.router.navigate(['/actualizar-adeudo', { adeudo: JSON.stringify(adeudo), adeudoId: key }]);
}

  ngOnInit() {
    this.subscription = this.db.list('ADEUDOS').snapshotChanges().subscribe(actions => {
      const updatedAdeudos = actions.map(action => {
        const val = action.payload.val();
        return (typeof val === 'object' && val !== null) 
          ? { key: action.key, ...val } 
          : { key: action.key };
      });
      this.adeudosData.next(updatedAdeudos);
    });
  }   

}
