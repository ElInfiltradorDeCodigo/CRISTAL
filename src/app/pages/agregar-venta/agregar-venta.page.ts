import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.page.html',
  styleUrls: ['./agregar-venta.page.scss'],
})
export class AgregarVentaPage implements OnInit {

  ventaForm: FormGroup;
  fechaFormateada: string;
  productores: any[] = [];
  insumos: any[] = [];

  constructor(public toastController: ToastController, private fb: FormBuilder, 
              private db: AngularFireDatabase, private afAuth: AngularFireAuth, 
              private router: Router, private loadingController: LoadingController) { 

    this.ventaForm = this.fb.group({
      nombre_cliente: ['', [Validators.required, Validators.maxLength(50)]],
      telefono_cliente: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      empleado: ['', [Validators.maxLength(50)]],
      productos: this.fb.array([
        this.crearProducto(),
      ]),
      total: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      mostrarCampos: [false],
      totalDiferir: [{value: '', disabled: true}, [Validators.maxLength(10)]],
      meses: [{value: '', disabled: true}, [Validators.maxLength(10)]],
      observaciones: ['', [Validators.maxLength(200)]],
    });

    const fechaActual: Date = new Date();
    this.fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

  }

  get productos(): FormArray {
    return this.ventaForm.get('productos') as FormArray;
  }

  crearProducto(): FormGroup {
    return this.fb.group({
      nombre: [''],
      cantidad: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      precio: [''],
    });
  }

  agregarProducto() {
    this.productos.push(this.crearProducto());
  }

  toggleCampos() {
    if (this.ventaForm.get('mostrarCampos')?.value) {
      
      const total = this.ventaForm.get('total')?.value;
      this.ventaForm.get('totalDiferir')?.setValue(total);
      this.ventaForm.get('meses')?.setValue((total / 3).toFixed(2));
    } else {
      
      this.ventaForm.get('totalDiferir')?.reset();
      this.ventaForm.get('meses')?.reset();
      this.ventaForm.get('observaciones')?.reset();
    }
  }
  

  async datosCambiados() {
    if (this.ventaForm.valid) {
        console.log(this.ventaForm.value);

        const loading = await this.loadingController.create({
            message: 'Registrando...',
            backdropDismiss: false 
        });
        await loading.present();

        const ventaData = this.ventaForm.getRawValue();

        try {
            
            const ventasRef = this.db.list('/VENTAS');
            await ventasRef.push({
                nombre_cliente: ventaData.nombre_cliente,
                telefono_cliente: ventaData.telefono_cliente,
                empleado: ventaData.empleado,
                productos: ventaData.productos,
                total: ventaData.total,
                fecha: this.fechaFormateada
            });

            if (ventaData.mostrarCampos) {
                const adeudosRef = this.db.list('/ADEUDOS');
                await adeudosRef.push({
                    nombre_cliente: ventaData.nombre_cliente,
                    telefono_cliente: ventaData.telefono_cliente,
                    totalDiferir: ventaData.totalDiferir,
                    meses: ventaData.meses,
                    observaciones: ventaData.observaciones,
                    fecha: this.fechaFormateada,
                    numero_pago: 0 
                });
            }

            await this.router.navigate(['/ventas']);
            await this.presentToast('Venta registrada exitosamente!', 'success');
        } catch (error) {
            
            console.error("Error al registrar venta: ", error);
            await this.presentToast('Error al registrar la venta. Intente nuevamente.', 'danger');
        } finally {
            
            await loading.dismiss();
        }

    } else {
        this.presentToast('Formulario inválido', 'danger');
        console.log('Formulario inválido');
    }
}


async presentToast(message: string, color: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    color: color,
  });
  toast.present();
}


  ngOnInit() {

    this.obtenerProductores();
    this.cargarUsuarioActual();
    this.cargarInsumos();

  }

  obtenerProductores() {
    this.db.list('/PRODUCTORES').valueChanges().subscribe((productores: any[]) => {
      this.productores = productores;
    }, error => {
      console.log(error); 
    });
  }

  productorSeleccionado(event: any) {
    const productorSeleccionado = event.detail.value;
    if (productorSeleccionado) {
        this.ventaForm.get('telefono_cliente')?.setValue(productorSeleccionado.telefono);
    }
  }

  cargarUsuarioActual() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.ventaForm.get('empleado')?.setValue(`${user.email}`);
      }
    });
  }

  cargarInsumos() {
    this.db.list('/INSUMOS').valueChanges().subscribe((insumos: any[]) => {
      this.insumos = insumos;
    }, error => {
      console.log(error); 
    });
  }

  cargarPrecio(event: any, productoIndex: number) {
    const nombreInsumoSeleccionado = event.detail.value;
    const insumoSeleccionado = this.insumos.find(insumo => insumo.nombre === nombreInsumoSeleccionado);
    if (insumoSeleccionado) {
      this.productos.at(productoIndex).get('precio')?.setValue(insumoSeleccionado.precio);
    }
  }

  calcularTotal() {
    let total = 0;

    this.productos.controls.forEach(control => {
      const cantidad = control.get('cantidad')?.value || 0;
      const precio = control.get('precio')?.value || 0;
  
      total += cantidad * precio;
    });
  
    this.ventaForm.get('total')?.setValue(total.toFixed(2));
  }

  eliminarProducto(index: number) {
    this.productos.removeAt(index);
    this.calcularTotal(); 
  }

}
