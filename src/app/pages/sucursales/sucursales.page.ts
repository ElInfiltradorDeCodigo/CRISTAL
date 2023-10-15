import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {

  sucursales$!: Observable<any[]>;

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
               private alertController: AlertController, private db: AngularFireDatabase,
               private storage: AngularFireStorage, private toastController: ToastController) { }

    async presentActionSheet(sucursal: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Sucursal',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion(sucursal);
        },
      },
        {
          text: 'Actualizar Datos',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.actualizarDatos();
          },
        },
        {
          text: 'Ver Departamentos',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verDepartamentos();
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

  async eliminacion(sucursal: any){
    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar esta sucursal?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            
            this.storage.refFromURL(sucursal.imageUrl).delete().subscribe(() => {
              console.log("Imagen eliminada del storage");
            }, error => {
              console.error("Error eliminando imagen del storage", error);
            });
  
            this.db.object(`SUCURSALES/${sucursal.key}`).remove().then(async () => {
              console.log("Sucursal eliminada de la base de datos");

              const toast = await this.toastController.create({
                message: 'Sucursal eliminada con éxito.',
                duration: 2000,
                color: 'success'
            });
            toast.present();
            
            }).catch(async error => {
              console.error("Error eliminando sucursal de la base de datos", error);

              const toast = await this.toastController.create({
                message: 'Error eliminando sucursal. Por favor, intenta de nuevo.',
                duration: 2000,
                color: 'danger'
            });
            toast.present();
            });
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });

    await alert.present();

  }

  actualizarDatos(){

    this.router.navigate(['/actualizar-sucursal']);

  }

  verDepartamentos(){

    this.router.navigate(['/departamentos']);

  }

  ngOnInit() {
    this.sucursales$ = this.db.list('SUCURSALES').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as object) }))
      )
    );
  }  

}
