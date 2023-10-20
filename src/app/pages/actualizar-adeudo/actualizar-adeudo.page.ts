import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController } from '@ionic/angular';

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
      adeudoId!: string | null;

  constructor(public toastController: ToastController, private route: ActivatedRoute,
              private db: AngularFireDatabase, private loadingController: LoadingController) { }

  async datosCambiados() {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();

    const adeudoId = this.route.snapshot.paramMap.get('adeudoId'); 

    this.db.object(`ADEUDOS/${adeudoId}`).update({
      totalDiferir: this.telefono,
      observaciones: this.correo,
      mesesDiferir: this.apellido_m,
      pagoPorMes: this.apellido_p
    }).then(async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'La Deuda Se Actualizo Correctamente!',
        duration: 2000,
        cssClass: 'toast-custom'
      });
      toast.present();
    }).catch(async error => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Error al actualizar: ' + error,
        duration: 2000,
        cssClass: 'toast-custom'
      });
      toast.present();
    });
  }

  calcularPagoPorMes() {
    if (this.apellido_m && this.telefono) {
        this.apellido_p = (parseFloat(this.telefono) / parseFloat(this.apellido_m)).toFixed(2);
    } else {
        this.apellido_p = '0';
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('adeudo')) {
        const adeudoData = JSON.parse(params.get('adeudo')!);
        this.telefono = adeudoData.totalDiferir;
        this.correo = adeudoData.observaciones;
        this.adeudoId = params.get('adeudoId');
      }
    });
  }
  

}
