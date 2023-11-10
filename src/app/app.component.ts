import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, NavController } from '@ionic/angular';

interface Opcion {
  title: string;
  url?: string;
  icon: string;
  action?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home'},
    { title: 'Mi Perfil', url: '/perfil', icon: 'person-circle' },
    { title: 'Sucursales', url: '/sucursales', icon: 'business' },
    { title: 'Departamentos', url: '/departamentos', icon: 'briefcase' },
    { title: 'Empleados', url: '/empleados', icon: 'people' },
    { title: 'Clientes', url: '/clientes', icon: 'people-circle' },
    { title: 'Productos', url: '/insumos', icon: 'layers' },
    { title: 'Ventas', url: '/ventas', icon: 'wallet' },
    { title: 'Adeudos', url: '/adeudos', icon: 'cash' },
    { title: 'Reportes', url: '/reportes', icon: 'document-text' },
    { title: 'Pronosticos (Beta)', url: '/pronosticos', icon: 'pricetags' },
  ];
  public opciones = [
    { title: 'Acerca De', url: '/acerca', icon: 'help' },
    { title: 'Cerrar Sesión', url: '/inicio-sesion', icon: 'log-out', action: 'logout' },
  ];
  constructor(private router: Router, private afAuth: AngularFireAuth, 
              private toastController: ToastController, private navCtrl: NavController) { }

  navigate(opcion: Opcion) {
    if(opcion.action && opcion.action === 'logout') {
      this.logout();
    } else {
      this.router.navigate([opcion.url]);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async logout() {
    try {
      this.presentToast('Cerrando sesión...');
      await this.afAuth.signOut();
      this.navCtrl.navigateRoot('/inicio-sesion', { animationDirection: 'back' });
    } catch(error) {
      console.error('Error cerrando sesión', error);
      this.presentToast('Error al cerrar la sesión.');
    }
  }

}
