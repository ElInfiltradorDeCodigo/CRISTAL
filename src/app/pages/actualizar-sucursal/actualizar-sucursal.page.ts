import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

@ViewChild('fileInput') fileInput!: ElementRef;
  selectedImage: File | null = null;
  imagePreview: string = "../../../assets/img/add-image.png";

  constructor(public toastController: ToastController, private router: Router,
              private db: AngularFireDatabase, private loadingController: LoadingController,
              private storage: AngularFireStorage) { } 

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      backdropDismiss: false
    });
    await loading.present();
    return loading;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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

    if (this.selectedImage) {
      const loading = await this.presentLoading('Actualizando imagen...');
      try {
        const filePath = `sucursales/${this.selectedImage.name}_${new Date().getTime()}`;
        const result = await this.storage.ref(filePath).put(this.selectedImage);
        const imageUrl = await result.ref.getDownloadURL();
        this.db.object(`SUCURSALES/${this.sucursalKey}`).update({ imageUrl: imageUrl });
      } catch (error) {
        console.error("Error al actualizar la imagen: ", error);
        this.presentToast('Error al actualizar la imagen, por favor intenta de nuevo.');
      }
      loading.dismiss();
    }
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

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.selectedImage = inputElement.files[0];

      if (!this.selectedImage.type.startsWith('image/')) {
        this.presentToast('Por favor, selecciona una imagen válida');
        this.selectedImage = null;
        return;
      }

      this.previewImage(this.selectedImage);
    } else {
      this.selectedImage = null;
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }



}

