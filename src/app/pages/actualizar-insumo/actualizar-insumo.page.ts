import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-insumo',
  templateUrl: './actualizar-insumo.page.html',
  styleUrls: ['./actualizar-insumo.page.scss'],
})
export class ActualizarInsumoPage implements OnInit {

  nombre: any;
      apellido_p: any;
      apellido_m: any;
      telefono: any;
      existencia: any;
      correo: any;
      sucursal: any;
      departamento: any;
      imagenInsumo!: string;
      imagenSeleccionada: any;

  constructor(public toastController: ToastController, private route: ActivatedRoute,
              private db: AngularFireDatabase, private storage: AngularFireStorage,
              private loadingController: LoadingController) { }

  async datosCambiados() {
    const loading = await this.loadingController.create({
      message: 'Actualizando insumo...',
    });
    await loading.present();
  
    if (this.imagenSeleccionada) {
      const randomId = Math.random().toString(36).substring(2);
      const filepath = `insumoImages/${randomId}`;
      const fileRef = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, this.imagenSeleccionada);
      
      task.snapshotChanges().pipe(
        finalize(async () => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            this.imagenInsumo = url;
            await this.updateInsumoDatabase();
            loading.dismiss();
          });
        })
      ).subscribe();
    } else {
      await this.updateInsumoDatabase();
      loading.dismiss();
    }
  }
  
  async updateInsumoDatabase() {
    let updateObject: any = {
      nombre: this.nombre,
      clave: this.apellido_p,
      unidad: this.apellido_m,
      precio: this.telefono,
      existencia: this.existencia
    };
  
    if (this.imagenInsumo) {
      updateObject.imageUrl = this.imagenInsumo;
    }
  
    try {
      await this.db.object(`INSUMOS/${this.route.snapshot.params['id']}`).update(updateObject);
      const toast = await this.toastController.create({
        message: 'Insumo Actualizado Exitosamente!',
        duration: 2000,
        cssClass: 'toast-custom'
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al actualizar el insumo',
        duration: 2000,
        cssClass: 'toast-custom-danger'
      });
      toast.present();
    }
  }              
              
  ngOnInit() {
    this.route.params.subscribe(params => {
      const insumoKey = params['id'];
      this.db.object(`INSUMOS/${insumoKey}`).valueChanges().subscribe((insumo: any) => {
        this.nombre = insumo.nombre;
        this.apellido_p = insumo.clave;
        this.apellido_m = insumo.unidad;
        this.telefono = insumo.precio;
        this.existencia = insumo.existencia;
        this.imagenInsumo = insumo.imageUrl;

      });
    });
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
  }  

}
