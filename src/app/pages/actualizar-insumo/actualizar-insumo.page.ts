import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-insumo',
  templateUrl: './actualizar-insumo.page.html',
  styleUrls: ['./actualizar-insumo.page.scss'],
})
export class ActualizarInsumoPage implements OnInit {

  nombre: any;
      apellido_p: any;
      apellido_m: any;
      telefono: any;
      existencia: any;
      correo: any;
      sucursal: any;
      departamento: any;

  constructor(public toastController: ToastController) { }

  async datosCambiados() {
    const toast = await this.toastController.create({
      message: 'Insumo Actualizado Exitosamente!',
      duration: 2000, // Duración en milisegundos
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
