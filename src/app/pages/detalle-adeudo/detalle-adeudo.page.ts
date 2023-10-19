import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-adeudo',
  templateUrl: './detalle-adeudo.page.html',
  styleUrls: ['./detalle-adeudo.page.scss'],
})
export class DetalleAdeudoPage implements OnInit {

  adeudo: any;

  constructor(public toastController: ToastController, private alertController: AlertController,
    private router: Router, private route: ActivatedRoute) {
      const adeudoParam = this.route.snapshot.paramMap.get('adeudo');
      if (adeudoParam) {
      this.adeudo = JSON.parse(adeudoParam);
      }
  }


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
           
          }
        },
        {
          text: 'Sí',
          handler: () => {

            this.datosCambiados();
            
          }
        }
      ],
      backdropDismiss: false,
    });
  
    await alert.present();
  }
  

  ngOnInit() {
  }

}
