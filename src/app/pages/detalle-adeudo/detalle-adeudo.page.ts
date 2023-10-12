import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-adeudo',
  templateUrl: './detalle-adeudo.page.html',
  styleUrls: ['./detalle-adeudo.page.scss'],
})
export class DetalleAdeudoPage implements OnInit {

  constructor(public toastController: ToastController, private alertController: AlertController,
              private router: Router) { }

  async datosCambiados() {
    const toast = await this.toastController.create({
      message: 'Pago Marcado Correctamente!',
      duration: 2000, // Duración en milisegundos
      cssClass: 'toast-custom'
    });
    toast.present();
    this.router.navigate(['/adeudos']);
  }

  async pagoRealizado() {
    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Desea Marcar Un Pago Realizado?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // El usuario ha seleccionado "No", realiza las acciones correspondientes aquí
          }
        },
        {
          text: 'Sí',
          handler: () => {

            this.datosCambiados();
            
          }
        }
      ],
      backdropDismiss: false, // Evita que se cierre al tocar fuera de la ventana
    });
  
    await alert.present();
  }
  

  ngOnInit() {
  }

}
