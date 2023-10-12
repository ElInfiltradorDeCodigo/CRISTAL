import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: any[] = [];

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase) {

      this.loadEmpleados();

     }

     loadEmpleados(): void {
      const empRef = this.db.list('EMPLEADOS').valueChanges();
      empRef.subscribe(data => {
        this.empleados = data;
      });
    }

  async presentActionSheet(empleado: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Empleado',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar Empleado',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion();
        },
        },
        {
          text: 'Ver Perfil',
          handler: () => {
            this.verPerfil(empleado.uid);
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

    async eliminacion(){

    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar este empleado?',
      buttons: ['Sí','No'],
    });

    await alert.present();

  }

  verPerfil(empleadoUid: string) {
    this.router.navigate(['/perfil-empleado', empleadoUid]);

    if (empleadoUid) {
      this.router.navigate(['/perfil-empleado', empleadoUid]);
  } else {
      console.error('empleadoUid is undefined or null');
  }
}

  actualizarEmpleado(){

    this.router.navigate(['/actualizar-empleado']);

  }

  ngOnInit() {
  }

}
