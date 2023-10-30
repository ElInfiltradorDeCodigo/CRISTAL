import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
              private alertController: AlertController,private loadingController: LoadingController,
              private db: AngularFireDatabase) {} 

    async datosCambiados() {
      let loading;
      try {
          loading = await this.loadingController.create({
              message: 'Iniciando sesión...',
              backdropDismiss: false,
          });
          await loading.present();
  
          const result = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
          
          if(result.user) {
              
              const empleadoRef = this.db.list('/EMPLEADOS', ref => ref.orderByChild('correo').equalTo(this.email)).snapshotChanges();

              empleadoRef.subscribe(async data => {
                  if (data.length > 0) {
                      
                      await this.router.navigate(['/inicio']);
                      const toast = await this.toastController.create({
                          message: '¡Bienvenido Emplead@!',
                          duration: 2000,
                          cssClass: 'toast-custom'
                      });
                      await toast.present();
                  } else {
                      
                      await this.afAuth.signOut();
                      const alert = await this.alertController.create({
                          header: '¡Error!',
                          message: 'No tienes permisos para acceder a esta aplicación, es para Empleados y no Productores.',
                          buttons: ['Ok'],
                      });
                      await alert.present();
                  }
              });
          }
      } catch(err) {
          console.log('Result:', err);
          const alert = await this.alertController.create({
              header: '¡Error!',
              message: 'Contraseña o Correo Incorrecto',
              buttons: ['Ok'],
          });
          await alert.present();
      } finally {
          if (loading) {
              await loading.dismiss();
          }
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
