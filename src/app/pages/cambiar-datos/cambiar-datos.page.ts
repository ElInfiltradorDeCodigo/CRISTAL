import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-datos',
  templateUrl: './cambiar-datos.page.html',
  styleUrls: ['./cambiar-datos.page.scss'],
})
export class CambiarDatosPage implements OnInit {

  nombre: string | undefined;
  apellido_p: string | undefined;
  apellido_m: string | undefined;
  telefono: string | undefined;
  contrasena: string | undefined;

  constructor(public toastController: ToastController) { }

  async datosCambiados() {
    const toast = await this.toastController.create({
      message: 'Datos Actualizados Correctamente!',
      duration: 2000, // Duración en milisegundos
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
