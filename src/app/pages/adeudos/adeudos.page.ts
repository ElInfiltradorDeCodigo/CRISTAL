import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adeudos',
  templateUrl: './adeudos.page.html',
  styleUrls: ['./adeudos.page.scss'],
})
export class AdeudosPage implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController) { }

  async presentActionSheet() {
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
            this.eliminacion();
        },
        },
        {
          text: 'Ver Detalle',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verEmpleados();
          },
        },
        {
          text: 'Actualizar Adeudo',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.actualizarVenta();
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
      message: '¿Realmente desea eliminar este adeudo?',
      buttons: ['Sí','No'],
      backdropDismiss: false,
    });

    await alert.present();

  }

  verEmpleados(){

    this.router.navigate(['/detalle-adeudo']);

  }

  actualizarVenta(){

    this.router.navigate(['/actualizar-adeudo']);

  }

  ngOnInit() {
  }

}
