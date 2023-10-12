import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.page.html',
  styleUrls: ['./insumos.page.scss'],
})
export class InsumosPage implements OnInit {

  insumos: any[] = [];

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase) { }
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Insumo',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar Insumo',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion();
        },
      },
        {
          text: 'Actualizar Infromación',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.actualizarDatos();
          },
        },
        {
          text: 'Ver Ventas Realizadas',
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
      message: '¿Realmente desea eliminar este insumo?',
      buttons: ['Sí','No'],
    });

    await alert.present();

  }

  actualizarDatos(){

    this.router.navigate(['/actualizar-insumo']);

  }

  verDepartamentos(){

    this.router.navigate(['/ventas']);

  }

  ngOnInit() {

    this.db.list('INSUMOS').valueChanges().subscribe((data: any[]) => {
      this.insumos = data;
    });

  }

}
