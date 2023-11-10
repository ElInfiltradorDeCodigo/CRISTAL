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
  selector: 'app-agregar-productor',
  templateUrl: './agregar-productor.page.html',
  styleUrls: ['./agregar-productor.page.scss'],
})
export class AgregarProductorPage implements OnInit {

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
        nombre: ['', [Validators.required, Validators.maxLength(45)]],
        apellido_p: ['', [Validators.required, Validators.maxLength(45)]],
        apellido_m: ['', [Validators.required, Validators.maxLength(45)]],
        telefono: ['', [Validators.required, Validators.maxLength(10)]],
        localidad: ['', [Validators.required, Validators.maxLength(70)]],
        estado: ['', [Validators.required, Validators.maxLength(70)]],
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
            const { nombre, apellido_p, apellido_m, telefono, localidad, estado } = this.empleadoForm.value;
            const loading = await this.presentLoading('Registrando cliente...');
        
            try {
              const email = `${telefono}@progomex.com`;
              const password = `${nombre.replace(/\s+/g, '').toUpperCase()}${telefono.substring(0, 3)}`;
      
              const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
              
              const uid = userCredential.user!.uid;
        
              const filePath = `productorImages/${new Date().getTime()}_${this.selectedImage.name}`;
              const fileRef = this.storage.ref(filePath);
              const task = this.storage.upload(filePath, this.selectedImage);
        
              await task.snapshotChanges().toPromise();
              const imageUrl = await fileRef.getDownloadURL().toPromise();
        
              const productorRef = this.db.list('PRODUCTORES');
              await productorRef.set(uid, {
                nombre,
                apellido_p,
                apellido_m,
                telefono,
                localidad,
                estado,
                imageUrl,
                email,
                password
              });
              loading.dismiss();
              this.presentToast('Cliente registrado con éxito');
              this.router.navigate(['/clientes']);
            } catch (error) {
              loading.dismiss();
              console.error('Error:', error);
              this.presentToast('Error al registrar cliente');
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