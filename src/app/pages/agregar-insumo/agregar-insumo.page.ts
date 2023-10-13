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
  selector: 'app-agregar-insumo',
  templateUrl: './agregar-insumo.page.html',
  styleUrls: ['./agregar-insumo.page.scss'],
})
export class AgregarInsumoPage implements OnInit {

  public empleadoForm: FormGroup;
  public sucursales: any[] = [];
  public departamentos: any[] = [];
  public departamentosFiltrados: any[] = [];
  selectedImage: File | null = null;
  public imagePreview: string = "../../../assets/img/add-image.png";

  constructor(public toastController: ToastController,private fb: FormBuilder,
    private afAuth: AngularFireAuth, private afs: AngularFirestore, private db: AngularFireDatabase,
    private router: Router, private storage: AngularFireStorage, private loadingController: LoadingController) {

      this.empleadoForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        clave: ['', [Validators.required, Validators.maxLength(45)]],
        unidad: ['', [Validators.required, Validators.maxLength(5)]],
        precio: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
        existencia: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
      });

     }

     ngOnInit(): 
     void {  } 

     oonImageSelected(event: Event): void {
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

     async registerProductor(): Promise<void> {
      if (this.empleadoForm.valid && this.selectedImage) {
        const { nombre, clave, unidad, precio, existencia } = this.empleadoForm.value;
        const loading = await this.presentLoading('Registrando insumo...');
    
        try {
          
          const filePath = `insumoImages/${new Date().getTime()}_${this.selectedImage.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, this.selectedImage);
    
          
          await task.snapshotChanges().toPromise();
          const imageUrl = await fileRef.getDownloadURL().toPromise();

          const insumoRef = this.db.list('INSUMOS');
          await insumoRef.push({
          nombre,
          clave,
          unidad,
          precio,
          existencia,
          imageUrl 
      });

      loading.dismiss();
      this.presentToast('Insumo registrado con éxito');
      this.router.navigate(['/insumos']);
    } catch (error) {
      loading.dismiss();
      console.error('Error:', error);
      this.presentToast('Error al registrar insumo');
      }
    } else {
      this.presentToast('Por favor, rellena el formulario correctamente');
    }
  }

      async presentLoading(loadingMessage: string): Promise<HTMLIonLoadingElement> {
        const loading = await this.loadingController.create({
          message: loadingMessage,
          spinner: 'crescent',
          backdropDismiss: false,
        });
        await loading.present();
        return loading;
      }

      async presentToast(message: string): Promise<void> {
        const toast = await this.toastController.create({
          message,
          duration: 2000
        });
        toast.present();
      }

}
