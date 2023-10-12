import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-adeudo',
  templateUrl: './actualizar-adeudo.page.html',
  styleUrls: ['./actualizar-adeudo.page.scss'],
})
export class ActualizarAdeudoPage implements OnInit {

      nombre: any;
      apellido_p: any;
      apellido_m: any;
      telefono: any;
      contrasena: any;
      correo: any;
      sucursal: any;
      departamento: any;

  constructor(public toastController: ToastController) { }

  async datosCambiados() {
    const toast = await this.toastController.create({
      message: 'La Deuda Se Actualizo Correctamente!',
      duration: 2000, // Duración en milisegundos
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
