import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  productores!: Observable<any[]>;

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase,) { }

  async presentActionSheet() {
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

    async eliminacion(){

    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar este productor?',
      buttons: ['Sí','No'],
    });

    await alert.present();

  }

  verPerfil(){

    this.router.navigate(['/perfil-productor']);

  }

  actualizarEmpleado(){

    this.router.navigate(['/actualizar-productor']);

  }


  ngOnInit() {

    this.cargarProductores();

  }

  cargarProductores() {
    this.productores = this.db.list('PRODUCTORES').valueChanges();
  }

}
