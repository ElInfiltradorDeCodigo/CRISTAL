import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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

sucursalKey!: string;



  constructor(public toastController: ToastController, private router: Router,
              private db: AngularFireDatabase) { }

async datosCambiados() {
  
  this.db.object(`SUCURSALES/${this.sucursalKey}`).update({
    nombre_sucursal: this.nombre_sucursal,
    tipo_sucursal: this.tipo_sucursal,
    colonia: this.colonia,
    codigo_postal: this.codigo_postal,
    localidad: this.localidad
  }).then(async () => {
    
    const toast = await this.toastController.create({
      message: 'Los Datos Se Actualizaron Correctamente!',
      duration: 2000, 
      cssClass: 'toast-custom'
    });
    toast.present();

    this.router.navigate(['/sucursales']);

    }).catch(async error => {
      
      const toast = await this.toastController.create({
        message: 'Error al actualizar. Por favor, intenta de nuevo.',
        duration: 2000,
        cssClass: 'toast-custom-error' 
      });
      toast.present();
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const sucursal = navigation.extras.state['sucursal'];
      this.setFormValues(sucursal);
    }
}

  setFormValues(sucursal: any) {
    if(sucursal) {
      this.nombre_sucursal = sucursal.nombre_sucursal;
      this.tipo_sucursal = sucursal.tipo_sucursal;
      this.colonia = sucursal.colonia;
      this.codigo_postal = sucursal.codigo_postal;
      this.localidad = sucursal.localidad;
      this.sucursalKey = sucursal.key;
    }
  }

}
