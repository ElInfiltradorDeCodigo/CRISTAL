import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {

  sucursales$!: Observable<any[]>;

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
               private alertController: AlertController, private db: AngularFireDatabase) { }

  async presentActionSheet() {
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
            this.eliminacion();
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

    async eliminacion(){

    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar esta sucursal?',
      buttons: ['Sí','No'],
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

    this.sucursales$ = this.db.list('SUCURSALES').valueChanges();

  }

}
