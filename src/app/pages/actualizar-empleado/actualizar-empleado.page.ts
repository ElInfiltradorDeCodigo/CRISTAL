import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.page.html',
  styleUrls: ['./actualizar-empleado.page.scss'],
})
export class ActualizarEmpleadoPage implements OnInit {

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
      message: 'Los Datos Se Actualizaron Correctamente!',
      duration: 2000, // Duración en milisegundos
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
