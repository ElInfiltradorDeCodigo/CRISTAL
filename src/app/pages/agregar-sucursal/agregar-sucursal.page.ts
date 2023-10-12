import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.page.html',
  styleUrls: ['./agregar-sucursal.page.scss'],
})
export class AgregarSucursalPage implements OnInit {

  public sucursalForm: FormGroup;
  selectedImage: File | null = null;
  public imagePreview: string = "../../../assets/img/add-image.png";

constructor(public toastController: ToastController,private fb: FormBuilder,
  private afAuth: AngularFireAuth, private afs: AngularFirestore, private db: AngularFireDatabase,
  private router: Router, private storage: AngularFireStorage, private loadingController: LoadingController) {

    this.sucursalForm = this.fb.group({
      nombre_sucursal: ['', [Validators.required, Validators.maxLength(50)]],
      tipo_sucursal: ['', [Validators.required, Validators.maxLength(20)]],
      colonia: ['', [Validators.required, Validators.maxLength(45)]],
      codigo_postal: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
      localidad: ['', [Validators.required, Validators.maxLength(70)]]
    });

   }

   async presentLoading(loadingMessage: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: loadingMessage,
      spinner: 'crescent'
    });
    await loading.present();
    return loading;
  }

    ngOnInit(): void { } 

    onImageSelected(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files[0]) {
          this.selectedImage = inputElement.files[0];

          // Validación del tipo de archivo
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

    async registerSucursal(): Promise<void> {
      if (this.sucursalForm.valid && this.selectedImage) {
        const loading = await this.presentLoading('Registrando sucursal...');

        try {
          
          const filePath = `sucursales/${this.selectedImage.name}_${new Date().getTime()}`;
          const result = await this.storage.ref(filePath).put(this.selectedImage);
          
          const imageUrl = await result.ref.getDownloadURL();
          
          const formData = this.sucursalForm.value;
          
          formData.imageUrl = imageUrl;
          
          await this.db.list('SUCURSALES').push(formData);

          loading.dismiss();
          this.presentToast('La Sucursal Se Ha Registrado!');
          this.sucursalForm.reset();
          this.imagePreview = "../../../assets/img/add-image.png";
          this.selectedImage = null;
          this.router.navigateByUrl('/sucursales');

        } catch (error) {

          loading.dismiss();
          console.error("Error al registrar sucursal: ", error);
          this.presentToast('Error al registrar la sucursal, por favor intenta de nuevo.');
        }
      } else {
      
        this.presentToast('Por favor, completa el formulario y selecciona una imagen.');
      }
    }

    async presentToast(message: string): Promise<void> {
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();
    }

    }
