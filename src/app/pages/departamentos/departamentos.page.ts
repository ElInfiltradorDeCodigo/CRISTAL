import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.page.html',
  styleUrls: ['./departamentos.page.scss'],
})
export class DepartamentosPage implements OnInit {

  //fecha = new Date().getUTCDate();

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Departamento',
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
          text: 'Ver Empleados',
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
      message: '¿Realmente desea eliminar este departamento?',
      buttons: ['Sí','No'],
    });

    await alert.present();

  }

  verEmpleados(){

    this.router.navigate(['/empleados']);

  }

  ngOnInit() {
  }

}
