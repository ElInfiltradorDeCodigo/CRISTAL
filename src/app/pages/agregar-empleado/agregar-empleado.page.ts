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
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.page.html',
  styleUrls: ['./agregar-empleado.page.scss'],
})
export class AgregarEmpleadoPage implements OnInit {

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
        contrasena: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
        correo: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
        sucursal: ['', [Validators.required, Validators.maxLength(50)]],
        departamento: ['', [Validators.required, Validators.maxLength(50)]]
      });

     }

     async presentLoading(loadingMessage: string): Promise<HTMLIonLoadingElement> {
      const loading = await this.loadingController.create({
        message: loadingMessage,
        spinner: 'crescent',
      });
      await loading.present();
      return loading;
    }
  
      ngOnInit(): 

        void {  

          this.cargarSucursales();
          this.cargarDepartamentos();

         } 

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

      cargarSucursales() {
        this.db.list('SUCURSALES').valueChanges().subscribe(data => {
          this.sucursales = data;
        });
      }
    
      cargarDepartamentos() {
        this.db.list('DEPARTAMENTOS').valueChanges().subscribe(data => {
          this.departamentos = data;
          this.filtrarDepartamentos(); 
        });
      }

      filtrarDepartamentos() {
        const sucursalSeleccionada = this.empleadoForm.get('sucursal')?.value;
        this.departamentosFiltrados = this.departamentos.filter(departamento => departamento.sucursal === sucursalSeleccionada);
      }
  
      private previewImage(file: File): void {
          const reader = new FileReader();
          reader.onload = () => {
              this.imagePreview = reader.result as string;
          };
          reader.readAsDataURL(file);
      }
      
      async registerEmpleado(): Promise<void> {
        if (this.empleadoForm.valid && this.selectedImage) {
            const {
                nombre,
                apellido_p,
                apellido_m,
                telefono,
                contrasena,
                correo,
                sucursal,
                departamento
            } = this.empleadoForm.value;

            const loading = await this.presentLoading('Registrando empleado...');
    
            try {
                const newUserCredential = await this.afAuth.createUserWithEmailAndPassword(correo, contrasena);
                if(newUserCredential.user) {
                    
                  const filePath = `userImages/${newUserCredential.user.uid}`;
                  const fileRef = this.storage.ref(filePath);
                  const task = this.storage.upload(filePath, this.selectedImage); 
                  
                  await task.snapshotChanges().toPromise();
                  const imageUrl = await fileRef.getDownloadURL().toPromise();
                  
                    await this.db.object(`EMPLEADOS/${newUserCredential.user.uid}`).set({
                        nombre,
                        apellido_p,
                        apellido_m,
                        telefono,
                        correo,
                        sucursal,
                        departamento,
                        imageUrl
                    });
                    loading.dismiss();
                    this.presentToast('Empleado registrado con éxito');
                    this.router.navigate(['/empleados']);
                } else {
                    throw new Error('User not returned - possible null');
                }
            } catch (error) {
                loading.dismiss();
                console.error('Error:', error);
                this.presentToast('Error al registrar empleado');
            }
        } else {
            this.presentToast('Por favor, rellena el formulario correctamente');
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
