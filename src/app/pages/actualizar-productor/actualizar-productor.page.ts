import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-actualizar-productor',
  templateUrl: './actualizar-productor.page.html',
  styleUrls: ['./actualizar-productor.page.scss'],
})
export class ActualizarProductorPage implements OnInit {

      nombre: any;
      apellido_p: any;
      apellido_m: any;
      telefono: any;
      localidad: any;
      estado: any;
      productorKey: any;

  constructor(public toastController: ToastController, private route: ActivatedRoute,
    private db: AngularFireDatabase, private router: Router) {

    if (this.route.snapshot.paramMap.get('productor')) {
      const productorData = JSON.parse(this.route.snapshot.paramMap.get('productor')!);
      this.nombre = productorData.nombre;
      this.apellido_p = productorData.apellido_p;
      this.apellido_m = productorData.apellido_m;
      this.telefono = productorData.telefono;
      this.localidad = productorData.localidad;
      this.estado = productorData.estado;
      this.productorKey = productorData.key;
      
      }

   }

   async datosCambiados(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async actualizarProductorEnFirebase() {
    try {
      await this.db.object(`PRODUCTORES/${this.productorKey}`).update({
        nombre: this.nombre,
        apellido_p: this.apellido_p,
        apellido_m: this.apellido_m,
        telefono: this.telefono,
        localidad: this.localidad,
        estado: this.estado
      });
      this.datosCambiados('Los Datos Se Actualizaron Correctamente!');
      this.router.navigate(['/clientes']);
    } catch (error) {
      console.error("Error al actualizar el productor: ", error);
      this.datosCambiados('Error al actualizar el productor.');
    }
  }

  ngOnInit() {
  }

}
