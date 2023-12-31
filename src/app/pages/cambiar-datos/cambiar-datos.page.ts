import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-cambiar-datos',
  templateUrl: './cambiar-datos.page.html',
  styleUrls: ['./cambiar-datos.page.scss'],
})
export class CambiarDatosPage implements OnInit {

  nombre: string | undefined;
  apellido_p: string | undefined;
  apellido_m: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  sucursal: string | undefined;
  departamento: string | undefined;
  selectedFile: any = null;

  constructor(public toastController: ToastController, private router: Router, 
              private db: AngularFireDatabase, private auth: AngularFireAuth, private storage: AngularFireStorage,
              private loadingController: LoadingController) { }

    async datosCambiados() {
      let loading: HTMLIonLoadingElement | undefined = undefined;
      try {

          loading = await this.loadingController.create({
            message: 'Actualizando datos...',
            backdropDismiss: false, 
            });
            await loading.present();

          const user = await this.auth.currentUser;
          const userUid = user?.uid;
  
          if (userUid) {
              let imageUrl: string | undefined = undefined;
              if (this.selectedFile) {
                  const filePath = `userImages/${userUid}`; 
                  const fileRef = this.storage.ref(filePath);
                  const task = this.storage.upload(filePath, this.selectedFile);
  
                  await task.snapshotChanges().toPromise();
                  imageUrl = await fileRef.getDownloadURL().toPromise();
              }
  
              await this.db.object(`EMPLEADOS/${userUid}`).update({
                  nombre: this.nombre,
                  apellido_p: this.apellido_p,
                  apellido_m: this.apellido_m,
                  telefono: this.telefono,
                  ...(imageUrl && { imageUrl: imageUrl })
              });
  
              const toast = await this.toastController.create({
                  message: 'Datos Actualizados Correctamente!',
                  duration: 2000,
                  cssClass: 'toast-custom'
              });
              toast.present();
              loading.dismiss(); 
              this.router.navigateByUrl('/perfil');
          } else {
              const toast = await this.toastController.create({
                  message: 'No hay usuario autenticado',
                  duration: 2000,
                  cssClass: 'toast-error'
              });
              toast.present();
              loading.dismiss(); 
          }
      } catch (error) {

        if (loading) {
          loading.dismiss(); 
      }
          const toast = await this.toastController.create({
              message: `Error al actualizar: ${error}`,
              duration: 2000,
              cssClass: 'toast-error'
          });
          toast.present();
      }
  }
            
            
  onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
        this.selectedFile = input.files[0];
    }
}          

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const perfil = navigation.extras.state['perfil'];
      this.setFormValues(perfil);
    }
  }

  setFormValues(perfil: any) {
    if(perfil) {
      this.nombre = perfil.nombre;
      this.apellido_p = perfil.apellido_p;
      this.apellido_m = perfil.apellido_m;
      this.telefono = perfil.telefono;
      this.correo = perfil.correo;
      this.sucursal = perfil.sucursal;
      this.departamento = perfil.departamento;
    }
  }

  numericOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return (charCode >= 48 && charCode <= 57);
  }

}
