import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  email!: string;
  password!: string;
  isPasswordVisible: boolean = false;

  constructor(private menu: MenuController, private router: Router, 
              public toastController: ToastController,public afAuth: AngularFireAuth,
              private alertController: AlertController,private loadingController: LoadingController) {}

  async datosCambiados() {
    try {
      
      const result = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);

      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        backdropDismiss: false,
      });
      await loading.present();
      
      if(result.user) {
        this.router.navigate(['/inicio']);
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Bienvenido!',
          duration: 2000,
          cssClass: 'toast-custom'
        });
        toast.present();
      }
    } catch(err) {
      
      const alert = await this.alertController.create({
        header: '¡Error!',
        message: 'Contraseña o Correo Incorrecto',
        buttons: ['Ok'],
      });
    
      await alert.present();
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menu.enable(false);
    }
    ionViewWillLeave(){
    this.menu.enable(true);
    }
    

}
