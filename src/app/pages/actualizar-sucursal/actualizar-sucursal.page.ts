import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular'; // 1. Importar LoadingController
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
              private db: AngularFireDatabase,
              private loadingController: LoadingController) { }  // 2. Inyectar LoadingController en el constructor

// 3. Método para mostrar el ProgressDialog
async presentLoading(message: string) {
  const loading = await this.loadingController.create({
    message: message,
    spinner: 'crescent',
    backdropDismiss: false
  });
  await loading.present();
  return loading;
}

async datosCambiados() {
  const loading = await this.presentLoading('Actualizando...'); 

  this.db.object(`SUCURSALES/${this.sucursalKey}`).update({
    nombre_sucursal: this.nombre_sucursal,
    tipo_sucursal: this.tipo_sucursal,
    colonia: this.colonia,
    codigo_postal: this.codigo_postal,
    localidad: this.localidad
  }).then(async () => {
    
    loading.dismiss();  
    const toast = await this.toastController.create({
      message: 'Los Datos Se Actualizaron Correctamente!',
      duration: 2000, 
      cssClass: 'toast-custom'
    });
    toast.present();

    this.router.navigate(['/sucursales']);

    }).catch(async error => {
      
      loading.dismiss(); 
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

