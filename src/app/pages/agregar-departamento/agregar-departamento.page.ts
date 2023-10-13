import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-departamento',
  templateUrl: './agregar-departamento.page.html',
  styleUrls: ['./agregar-departamento.page.scss'],
})
export class AgregarDepartamentoPage implements OnInit {

  form: FormGroup;
  sucursales: any[] = [];
  autor!: string;

  constructor(public toastController: ToastController, private db: AngularFireDatabase,
              private fb: FormBuilder, private auth: AngularFireAuth, private loadingCtrl: LoadingController, 
              private router: Router) 

              {

                const fechaActual = new Date().toISOString().split('T')[0];
                this.form = this.fb.group({
                  nombre_departamento: ['', [Validators.required, Validators.maxLength(50)]],
                  sucursal: ['', Validators.required],
                  fecha_creacion: [{value: fechaActual, disabled: true}, Validators.required],
                  autor: [{value: '', disabled: true}, Validators.required]
                });

               }

  ngOnInit() {
    this.cargarSucursales();
    this.cargarUsuarioActual();
  }
  
  cargarSucursales() {
    this.db.list('SUCURSALES').valueChanges().subscribe(data => {
      this.sucursales = data;
    });
  }

  cargarUsuarioActual() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.autor = user.displayName || user.email || 'Usuario desconocido';
        this.form.get('autor')?.setValue(this.autor);
      }
    });
  }

  async datosCambiados() {
    if (this.form.valid) {
      const departamentoData = this.form.getRawValue();
      const departamentosRef = this.db.list('DEPARTAMENTOS');

      const loading = await this.loadingCtrl.create({
        message: 'Registrando departamento...',
        backdropDismiss: false,
      });
      await loading.present();
      
      try {
        await departamentosRef.push({
          nombre: departamentoData.nombre_departamento,
          sucursal: departamentoData.sucursal,
          fecha_creacion: departamentoData.fecha_creacion,
          autor: departamentoData.autor
        });

        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'El Departamento Se Ha Registrado!',
          duration: 2000,
          cssClass: 'toast-custom'
        });
        toast.present();
        this.router.navigate(['/departamentos']);

      } catch(error) {
        
        await loading.dismiss();
        console.error('Error al registrar el departamento:', error);

      const toast = await this.toastController.create({
        message: 'Hubo un error al registrar el departamento.',
        duration: 2000,
        cssClass: 'toast-custom'
      });
      toast.present();
    }
  } else {
    const toast = await this.toastController.create({
      message: 'Por favor, llena todos los campos correctamente.',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }
  }
}
