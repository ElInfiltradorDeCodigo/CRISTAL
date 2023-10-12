import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-sucursal',
  templateUrl: './actualizar-sucursal.page.html',
  styleUrls: ['./actualizar-sucursal.page.scss'],
})
export class ActualizarSucursalPage implements OnInit {
nombre_sucursal: any;
tipo_sucursal: any;
colonia: any;
codigo_postal: any;
localidad: any;



  constructor(public toastController: ToastController) { }

  async datosCambiados() {
    const toast = await this.toastController.create({
      message: 'Los Datos Se Actualizaron Correctamente!',
      duration: 2000, // Duración en milisegundos
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
